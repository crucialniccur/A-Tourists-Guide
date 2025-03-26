// fetch("https://a-tourists-guide.onrender.com/api/users")
//   .then((res) => res.json())
//   .then(console.log);

// const { error } = require("console");

//declare variables at the global context here
let countyInput = document.querySelector("#country-code");
let formSubmit = document.querySelector("#search-county");
let imageDiv = document.querySelector("#image");
let spanDetailsDiv = document.querySelector("#span-details");

//add an event listener to the form
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInput = countyInput.value.trim().toLowerCase();
  console.log(countyInput.value);
  fetch("http://localhost:3008/counties")
    .then((res) => res.json())
    .then((counties) => {
      counties.forEach((county) => {
        let countyName = county.name;
        let countyId = county.id;
        countyInput = countyId;
        // let countyImgSrc  = county.img
        //   console.log(county.name);
        //   console.log(county.id);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

// the fetch to get details
