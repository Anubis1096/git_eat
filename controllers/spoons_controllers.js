const express = require("express");
const { userInput } = require("./spoons");

const router = express.Router();

const userCalls = require("./spoons");

//find new recipes
router.post("/api/spoons/", function (req, res) {
  userCalls.userInput(userInput, function (data) {
    // Send back the ID of the new burger
    res.json();
    console.log(data);
    console.log(userInput + " this guy");
  });
});

router.post("/api/recipe/", function (req, res) {
  userCalls.userInput(recipeID, function (data) {
    // Send back the ID of the new burger
    res.json();
    console.log(data);
    console.log(recipeID + " this guy");
  });
});
