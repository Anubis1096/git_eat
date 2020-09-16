const spoons = require("../config/spoonCalls")

const userCalls = {
  userInput: function (somethingFromTheClient) {
    spoons.userInput(somethingFromTheClient, function (res) {
      cb(res);
    });
  },
};

module.exports = userCalls;
