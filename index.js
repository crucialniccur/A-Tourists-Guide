// fetch("https://a-tourists-guide.onrender.com/api/users")
//   .then((res) => res.json())
//   .then(console.log);

//declare variables at the global context here
let countyInput = document.querySelector("#country-code");
let formSubmit = document.querySelector("#search-county");

//add an event listener to the form
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(countyInput.value);

  // the fetch to get details
  fetch("http://localhost:3008/counties")
    .then((res) => res.json())
    .then(console.log);
});
