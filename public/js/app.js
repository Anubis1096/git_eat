$(document).ready(function () {
  // const navSlide = () => {
  //   const burger = document.querySelector(".burger");
  //   const nav = document.querySelector(".nav-links");
  //   const navLinks = document.querySelectorAll(".nav-links li");

  //   burger.addEventListener("click", () => {
  //     //toggle nav
  //     nav.classList.toggle("nav-active");

  //     // animate links
  //     navLinks.forEach((link, index) => {
  //       if (link.style.animation) {
  //         link.style.animation = "";
  //       } else {
  //         link.style.animation = `navLinksFade 0.5s ease forwards ${
  //           index / 7 + 1.3
  //         }s`;
  //       }
  //     });
  //     // burger animation
  //     burger.classList.toggle("toggle");
  //   });
  // };

  // navSlide();

  // // This file just does a GET request to figure out which user is logged in
  // // and updates the HTML on the page
  // $.get("/api/user_data").then(function (data) {
  //   $(".member-name").text(data.email);
  // });

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $("#recipeCards").empty();
    const userInput = $("#userInput").val();
    console.log(userInput);

    if (userInput == "") {
      // if the user does not enter a name, display error message
      alert("Please enter an ingredient");
    } else {
      $.ajax("/api/spoons/", {
        type: "POST",
        data: {
          userInput: userInput,
        },
      }).then(function (res) {
        for (let i = 0; i < 5; i++) {
          const recipeBox = $("#recipeCards");
          const card = $(' <div class="card" id="card">');
          const recipeTitleDiv = $(
            ' <h3 class="yellow" id="recipeTitle"></h3>'
          );
          const id = res[0].id;
          const recipeImage = $(
            `<img src=${res[i].image} alt=${res[i].title}>`
          );
          recipeImage.attr("id", id);
          recipeImage.attr("class", "image");
          recipeTitleDiv.append(`${res[i].title}`);
          card.append(recipeTitleDiv, recipeImage);
          recipeBox.append(card);

          // Append the table row to the table body

          console.log(res);
        }
      });
    }

    console.log("clicky working");
  });

  // $("<img>").on("click", function (event) {
  //   event.preventDefault();
  //   $("#recipeCards").empty();
  //   const userInput = this.id;
  //   console.log(userInput);

  //   if (userInput == "") {
  //     // if the user does not enter a name, display error message
  //     alert("Please enter an ingredient");
  //   } else {
  //     $.ajax("/api/spoons/", {
  //       type: "POST",
  //       data: {
  //         userInput: userInput,
  //       },
  //     }).then(function (res) {
  //       for (let i = 0; i < 5; i++) {
  //         const recipeBox = $("#recipeCards");
  //         const card = $(' <div class="card" id="card">');
  //         const recipeTitleDiv = $(
  //           ' <h3 class="yellow" id="recipeTitle"></h3>'
  //         );
  //         const id = res[i].title;
  //         const recipeImage = $(
  //           `<img src=${res[i].image} alt=${res[i].title}>`
  //         );
  //         recipeImage.attr("id", id);
  //         recipeImage.attr("class", "image");
  //         recipeTitleDiv.append(`${res[i].title}`);
  //         card.append(recipeTitleDiv, recipeImage);
  //         recipeBox.append(card);

  //         // Append the table row to the table body

  //         console.log(res);
  //       }
  //     });
  //   }

  //   console.log("clicky working");
  // });
});
