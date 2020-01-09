var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
let passport = require("./config/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bubbleRouter = require("./routes/bubble");
var messagesRouter = require("./routes/messages");
var invitationsRouter = require("./routes/invitations");
var votesRouter = require("./routes/votes");
var uploadRouter = require('./routes/upload');


var app = express();

app.use(passport.initialize());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bubble", bubbleRouter);
app.use("/messages", messagesRouter);
app.use("/invitations", invitationsRouter);
app.use("/votes", votesRouter);
app.use('/upload', uploadRouter);


module.exports = app;
