var express = require("express");
var router = express.Router();
var createError = require("http-errors");
const errorCodes = require('statuses').codes

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

errorCodes.forEach((errorCode) => {
  router.get("/" + errorCode, function (req, res, next) {
    next(createError(errorCode));
  });
});

module.exports = router;
