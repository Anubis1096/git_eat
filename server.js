// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
//secures api keys and other information you want to protect

// const PORT = process.env.PORT || 8080;


// Setting up port and requiring models for syncing
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
