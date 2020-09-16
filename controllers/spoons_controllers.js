const express = require("express");

const router = express.Router();

const userCalls = require("../models/spoons");

//find new recipes
router.get("/api/spoons", function (req, res) {
    userCalls.userInput(req.body.item, function (data) {
      // Send back the ID of the new burger
      res.json();
       console.log(data);
       console.log(req.body.item + " this guy");
    });
  });