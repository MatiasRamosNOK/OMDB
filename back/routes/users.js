var express = require("express");
var router = express.Router();
var path = require("path");
const User = require("../models/User.js");
var passport = require("passport");

router.get("/login", function (req, res, next) {
  console.log("ESTA AUTENTICADO:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("Registro y login OK");
    res.send("Estas autenticado!");
  }
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});

router.post("/login", passport.authenticate("local"), function (
  req,
  res,
  next
) {
  console.log("Log OK!");
  res.redirect("/");
});

router.get("/register", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});

router.post("/register", function (req, res, next) {
  User.create(req.body).then((user) => {
    console.log(user);
    res.redirect("/users/login");
  });
});

module.exports = router;
