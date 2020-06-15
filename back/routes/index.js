"use strict";
const path = require("path");
var express = require("express");
var router = express.Router();
var users = require("./users");

// escriban sus rutas acá
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.use("/users", users);

router.get("/logout", function (req, res, next) {
  req.logout();
  console.log("PAso por logout");
  res.redirect("/");
});

module.exports = router;
