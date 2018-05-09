var express = require("express");
var http = require('http');
var path = require("path");
var logger = require("morgan");
var cookiesParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");

// Middleware
var { notFound, unAuthorized, passportAuthen } = require("./middleware");

var app = express();

var apiRouter = require("./Route");

passport.use(passportAuthen);

app.use(cors()); // cross-origin for all route
app.use(logger("dev"));
app.use(cookiesParser()); // use to get cookies of request header
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use("/assets", express.static("assets"));

app.use("/api", apiRouter);

app.use(notFound);
app.use(unAuthorized);
module.exports = app;