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
        // reload the page to display new burger
        console.log(res);
      });
    }

    console.log("clicky working");
  });
});
