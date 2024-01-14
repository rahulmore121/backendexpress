require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const corsOptions = require("./config/corsOptions.js");
const errorHandler = require("./middleware/errorHandler.js");
const verfiJWT = require("./middleware/verifyJwt.js");
const credentials = require("./middleware/credentials.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn.js");
const port = process.env.PORT || 3500;

//connect the mongo db
connectDB();

//built in middleware //FORM DATA url encode data //content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//JSON DATA
app.use(express.json());

//miidleware for cookes
app.use(cookieParser());
//access control allow credential
//handle options credentials check before cors
//and fetch cookies credentials requiremnt
app.use(credentials);
//cors
app.use(cors(corsOptions));

//server static file //Routes //routing the index .html (optional for this project)
// app.use("/", express.static(path.join(__dirname, "public")));
// app.use("/", require("./routes/subdir.js"));

//employee route
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/refreshToken.js"));
app.use("/logout", require("./routes/logout.js"));
//adding middleware
app.use(verfiJWT);
app.use("/employees", require("./routes/api/employees.js"));

app.get("/*", (req, res) => {
  //   res.send("Hello");
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//error handler middleware
app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Coonected to DB");
  app.listen(port, (err) => {
    if (err) throw err;
    console.log("App is listening on port ", port);
  });
});
