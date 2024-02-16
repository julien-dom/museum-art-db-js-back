require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var clevelanddatasRouter = require("./routes/clevelanddatas");
var metdatasRouter = require("./routes/metdatas");
var artworkRouter = require("./routes/artwork")

var app = express();
const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/clevelanddatas", clevelanddatasRouter);
app.use("/metdatas", metdatasRouter);
app.use('/artwork', artworkRouter);

module.exports = app;
