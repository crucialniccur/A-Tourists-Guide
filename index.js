// fetch("https://a-tourists-guide.onrender.com/api/users")
//   .then((res) => res.json())
//   .then(console.log);

// const { error } = require("console");

//declare variables at the global context here
let countyInput = document.querySelector("#country-code");
let formSubmit = document.querySelector("#search-county");
let imageDiv = document.querySelector("#image");
let spanDetailsDiv = document.querySelector("#span-details");
let nameDetails = document.querySelector("#nameDetail");
let funFact = document.querySelector("#funFact");
let mainResource = document.querySelector("#mainResource");
let touristAttraction = document.querySelector("#touristAttraction");

//add an event listener to the form
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInput = countyInput.value.trim().toLowerCase();
  console.log(countyInput.value);
  fetch("http://localhost:3008/counties")
    .then((res) => res.json())
    .then((counties) => {
      counties.forEach((county) => {
        let matchCounty = counties.find(
          (county) => county.name.toLowerCase() === userInput
        );

        if (matchCounty) {
          nameDetails.textContent = `County : ${matchCounty.name}`;
          funFact.textContent = `${matchCounty.fun_fact}`;
          mainResource.textContent = `${matchCounty.main_resource}`;
          touristAttraction.textContent = `${matchCounty.tourist_attraction}`;
        } else {
          spanDetailsDiv.textContent =
            "County not found, check for errors in spellings ";
        }
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
  //clear the form
  formSubmit.reset();
});
