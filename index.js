document.addEventListener("DOMContentLoaded", () => {
  // fetch("https://a-tourists-guide.onrender.com/api/users")
  //   .then((res) => res.json())
  //   .then(console.log);

  // const { error } = require("console");

  //declare variables at the global context here
  let fetchCountiesUrl =
    "https://tourist-backend-w8qc.onrender.com/api/counties";
  let countyInput = document.querySelector("#country-code");
  let formSubmit = document.querySelector("#search-county");
  let imageDiv = document.querySelector("#image");
  let imageDivImage = document.querySelector("#image img");
  let spanDetailsDiv = document.querySelector("#span-details");
  let nameDetails = document.querySelector("#nameDetail");
  let funFact = document.querySelector("#funFact");
  let mainResource = document.querySelector("#mainResource");
  let touristAttraction = document.querySelector("#touristAttraction");
  let imageSlideImg = document.querySelector("#image-slide img");
  let imageResult = document.querySelector("#imageResult");
  let commentSpan = document.querySelector("#comments");

  //span details div  spans before clicking
  let detailsSpans = document.querySelectorAll("#span-details span");
  // make details div invinsible before user input
  let details = document.querySelector("#details");
  details.style.display = "none";
  // make each span invinsible
  // detailsSpans.forEach((span) => {
  //   span.style.display = "none";
  // });

  //add an event listener to the form
  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let userInput = countyInput.value.trim().toLowerCase();
    console.log(countyInput.value);
    fetch(fetchCountiesUrl)
      .then((res) => res.json())
      .then((counties) => {
        counties.forEach((county) => {
          let matchCounty = counties.find(
            (county) => county.name.toLowerCase() === userInput
          );

          if (matchCounty) {
            document.querySelector("#countyName").textContent =
              matchCounty.name;

            nameDetails.textContent = `County : ${matchCounty.name}`;
            funFact.textContent = `A fun fact : ${matchCounty.fun_fact}`;
            mainResource.textContent = `The county's main resource is: ${matchCounty.main_resource}`;
            touristAttraction.textContent = `A place of intereset: ${matchCounty.tourist_attraction}`;
            imageResult.src = `${matchCounty.imgUrl}`;
            // let countyName = document.querySelector("#countyName");
            // countyName.textContent = `${matchCounty.name}`;
            commentSpan.textContent = `User comments are : ${matchCounty.comments}`;

            // display spans
            // let detailsSpans = document.querySelectorAll("#span-details span");
            // detailsSpans.forEach((span) => {
            //   span.style.display = "inline";
            // });
            // make the details div visible
            details.style.display = "flex";

            // imageSlideImg.src = `${matchCounty.imgUrl}`;
          } else {
            spanDetailsDiv.textContent =
              "County not found, check for errors in spellings ";
          }
          let countyName = county.name;
          let countyId = county.id;
          countyInput = countyId;
          // let countyImgSrc  = county.imgUrl
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

  //add an eventlistener, a mouseover and mouse leave on the image
  imageDiv.addEventListener("mouseover", (e) => {
    // console.log(e);
    imageDivImage.style.transform = "scale(1.1)";
    // imageDiv.style.transform = "scale(1.1)";
  });

  imageDiv.addEventListener("mouseleave", () => {
    imageDivImage.style.transform = "scale(1)";
    // imageDiv.style.transform = "scale(1)";
  });

  // // select form and the inputs
  // let commentsForm = document.querySelector("#commentsForm");
  // let commentInput = document.querySelector("#commentInput");

  // commentsForm.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   //new comment logic
  //   let newComment = commentInput.value.trim();
  //   if (!newComment) {
  //     return alert("Please input a comment in the field");
  //   }

  //   //country name
  //   let selectedCounty = document.querySelector("#countyName").textContent.trim();
  //   if (!selectedCounty) return alert("Please search for a county first.");

  //fetch counties
  //   fetch(fetchCountiesUrl)
  //     .then((res) => res.json())
  //     .then((counties) => {
  //       let matchCounty = counties.find(
  //         (county) => county.name.toLowerCase() === selectedCounty.toLowerCase()
  //       );

  //       if (!matchCounty) {
  //         alert("County not found in the database.");
  //         return;
  //       }

  //       let countyId = matchCounty.id;
  //       let updatedComments = [...(matchCounty.comments || []), newComment];

  //       // PATCH request to update comments
  //       fetch(`${fetchCountiesUrl}/${countyId}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ comments: updatedComments }),
  //       })
  //         .then((res) => res.json())
  //         .then((updatedCounty) => {
  //           console.log("Updated County:", updatedCounty);
  //           alert("Comment added successfully!");
  //           commentInput.value = ""; // Clear input field
  //         })
  //         .catch((error) => console.error("Error updating comment:", error));
  //     })
  //     .catch((error) => console.error("Error fetching counties:", error));
  // });

  // implementing post to post comments form users
  // grab the comment input and form
  // let commentsForm = document.querySelector("#commentsForm");
  // let commentInput = document.querySelector("#commentInput");

  // // event listener to the form
  // commentsForm.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   // new comment logic
  //   let newComment = commentInput.value.trim();
  //   if (!newComment) {
  //     return alert("Please input a comment in the field");
  //   }

  //   //country name
  //   let selectedCounty = document.querySelector("#countyName").textContent.trim();
  //   if (!selectedCounty) return alert("Please search for a county first.");
  // });

  commentsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newComment = commentInput.value.trim();
    if (!newComment) {
      return alert("Please input a comment in the field");
    }

    let selectedCounty = document
      .querySelector("#countyName")
      .textContent.trim();
    if (!selectedCounty) return alert("Please search for a county first.");

    fetch(fetchCountiesUrl)
      .then((res) => res.json())
      .then((counties) => {
        let matchCounty = counties.find(
          (county) => county.name.toLowerCase() === selectedCounty.toLowerCase()
        );

        if (!matchCounty) {
          alert("County not found in the database.");
          return;
        }

        let countyId = matchCounty.id;
        let updatedComments = [...(matchCounty.comments || []), newComment];

        // Send new comment via PATCH request
        fetch(`${fetchCountiesUrl}/${countyId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: updatedComments }),
        })
          .then((res) => res.json())
          .then((updatedCounty) => {
            console.log("Updated County:", updatedCounty);
            alert("Comment added successfully!");
            commentInput.value = ""; // Clear input field
          })
          .catch((error) => console.error("Error updating comment:", error));
      })
      .catch((error) => console.error("Error fetching counties:", error));
  });
});
