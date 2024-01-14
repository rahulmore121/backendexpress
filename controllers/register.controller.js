// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// const fsPromises = require("fs").promises;
// const path = require("path");

//usermodel
const User = require("../model/User.js");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });
  //check for duplicate username in DB
  // const duplicate = usersDB.users.find((person) => person.username === user);
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //conflict
  try {
    //encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // //store the new user
    // const newUser = {
    //   username: user,
    //   password: hashedPwd,
    //   roles: {
    //     User: 2001,
    //   },
    // };
    // usersDB.setUsers([...usersDB.users, newUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );
    // console.log(usersDB.users);

    //create ad store user in db

    //other way to create the record
    //  const newUser = new User();
    //  newUser.username = user;
    //  newUser.password = hashedPwd
    //  const result = await newUser.save()

    //anotherway
    // const newUser = new User({
    //   username: user,
    //   password: hashedPwd,
    // });
    // const result = await newUser.save();

    //most used method
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);

    res.status(201).json({ success: `New User ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
