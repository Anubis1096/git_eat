require('dotenv').config()
console.log("MY_VARIABLE: " + process.env.API_KEY);
const food = $("somethingFromTheClient")
const spoons = {

// first api call is "typed ingredients"
userSearch: function () {
  let settings = {
    async: true,
    crossDomain: true,
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=" + $(food).val() ,
    method: "GET",
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(settings.url);
  });
}
//************* */  This scans the barcode and reutrns the result
// const barcode = [];
// const scannedIngredient = [];
// const recipeID = [];
// function quagga() {
//   "do the thing";
//   barcode.push(results);
// }
//***************This is built into the browser page

// second api call "use returned UPC to find ingredient names"

function ingredient() {
  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/upc/${barcode}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  )
    .then((response) => {
      console.log(response);
      scannedIngredient.push(response);
      recipe();
    })
    .catch((err) => {
      console.log(err);
    });
}
// third api call "take recipe id to search for GET Get Recipe Information"
function recipe() {
  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=${scannedIngredient}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  )
    .then((response) => {
      console.log(response);
      recipeID.push(response);
      finalSearch();
    })
    .catch((err) => {
      console.log(err);
    });
}
// fourth api call "take recipe id to search for GET Get Recipe Information"
function finalSearch() {
  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/${recipeID}//information`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  )
    .then((response) => {
      console.log(response);
      // Place Title, Image, Instructions, URL onto HTML in card
    })
    .catch((err) => {
      console.log(err);
    });
}


module.exports = spoons;