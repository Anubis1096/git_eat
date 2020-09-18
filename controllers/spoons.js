const spoons = require("../config/spoonCalls")

const userCalls = {
  userSearch: function (text) {
    spoons.userSearch(text, function (res) {
      cb(res);
    });
  },
};

module.exports = userCalls;
