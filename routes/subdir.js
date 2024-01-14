const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  //   res.send("Hello");
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/index.html");
});

module.exports = router;
