// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
require("dotenv").config();

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
        console.log(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  // find new recipes
  app.get("/api/spoons/", function (req, res) {
    console.log("route hit");
    const typedStuff = req.body.userInput;
    console.log(typedStuff);
    axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.API_KEY,
        useQueryString: true,
      },
      params: {
        number: "5",
        ranking: "1",
        ignorePantry: "false",
        ingredients: typedStuff,
      },
    })
      // Send back the API data
      .then((response) => {
        // console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

// app.post("/api/spoons/", function (req, res) {
//   console.log("route hit");
//   const recipeID = req.body.id;
//   console.log(recipeID);
//   axios({
//     method: "GET",
//     url:
//       "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information",
//     headers: {
//       "content-type": "application/octet-stream",
//       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//       "x-rapidapi-key": process.env.API_KEY,
//       useQueryString: true,
//     },
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
// }
