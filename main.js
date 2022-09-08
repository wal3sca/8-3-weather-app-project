// ADDS EVENT LISTENER, FETCHES API,
// STOPS PAGE RELOAD AND CHECKS USERS INPUT VALUE
const formSubmission = document.querySelector("form")

formSubmission.addEventListener("submit", (event) => {
  event.preventDefault();
// not sure how to use this
// const userInputValue = input.value
// not sure how to create an API key

// THIS WILL REFRESH PREVIOUS TEXT
const location = event.target.location.value;
  
// SEARCHES FOR ERRORS
// if no location and button is submitted, it shows an error
if (!location) {
  document.querySelector(".display").classList.add("error");

// otherwise, it removes the search history
} else {
  document.querySelector(".history p").classList.add("hidden");
}

  // TRIED USING SYNTAX FROM ERROR HANDLING LAB BUT I DON'T THINK THIS WILL WORK???
  // function previousSearchError() {
  //   if(location.length === 0){
  //     throw "No previous searches have been made"
  //   }
  //   let result = 0;
  //   for (let product of cart) {
  //     result += product.priceInCents;
  //   }
  //   return result;
  // }
  
  fetch(`https://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((weather) => {


// CHECKING THE WEATHER
document.querySelector("#textBox").innerHTML = `<h2>${weather.nearest_area[0].areaName[0].value}
</h2>

<p><b>Area:</b> ${weather.nearest_area[0].areaName[0].value}</p>
<p><strong>Region:</strong> ${weather.nearest_area[0].region[0].value}</p>
<p><b>Country:</b> ${weather.nearest_area[0].country[0].value}</p>
<p><b>Currently:</b> Feels Like ${weather.weather[0].avgtempF}°F</p>`;
  
document.querySelector("#today").innerHTML = `<h3>Today</h3>
<p><b>Average Temperature:</b> ${weather.weather[0].avgtempF}°F</p>
<p><strong>Max Temperature:</strong> ${weather.weather[0].maxtempF}°F</p>
<p><b>Min Temperature:</b> ${weather.weather[0].mintempF}°F</p>`;
  
document.querySelector("#tomorrow").innerHTML = `<h3>Tomorrow</h3>
<p><b>Average Temperature:</b> ${weather.weather[1].avgtempF}°F</p>
<p><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF}°F</p>
<p><b>Min Temperature:</b> ${weather.weather[1].mintempF}°F</p>`;

document.querySelector("#dayAfter").innerHTML = `<h3>Day After Tomorrow</h3>
<p><b>Average Temperature:</b> ${weather.weather[2].avgtempF}°F</p>
<p><strong>Max Temperature:</strong> ${weather.weather[2].maxtempF}°F</p>
<p><b>Min Temperature:</b> ${weather.weather[2].mintempF}°F</p>`;
  
// 4 ARTICLES IN MAIN
const mainInfo = document.createElement("article");
mainInfo.id = "main-info";
const today = document.createElement("article");
today.id = "today";
const tomorrow = document.createElement("article");
tomorrow.id = "tomorrow";
const dayAfter = document.createElement("article");
dayAfter.id = "day-after";
  
// GET PREVIOUS SEARCHES
const previousSearches = document.querySelector("ul");
console.log(previousSearches)

previousSearches.innerHTML += `<li><a href="#">${location}</a> - ${weather.weather[2].maxtempF}°F</li>`;

const holds = document.querySelectorAll("a");

for (let hold of holds) {
  hold.addEventListener("click", (event) => {
    event.preventDefault();
  
// CLICK FOR PREVIOUS SEARCHES
const link = event.target.textContent;
console.log(link);

document.querySelector(".history p").classList.add("hidden");
fetch(`https://wttr.in/${link}?format=j1`)
.then((response) => response.json())
.then((weather) => {
  console.log(weather);
  document.querySelector("#textBox").innerHTML = `<h2>${weather.nearest_area[0].areaName[0].value}</h2>
  
  <p><b>Area:</b> ${weather.nearest_area[0].areaName[0].value}</p>
  <p><strong>Region:</strong> ${weather.nearest_area[0].region[0].value}</p>
  <p><b>Country:</b> ${weather.nearest_area[0].country[0].value}</p>  <p><b>Currently:</b> Feels Like ${weather.current_condition[0].feelsLikeF}°F</p>`;
  
document.querySelector("#today").innerHTML = `<h3>Today</h3>
<p><b>Average Temperature:</b> ${weather.weather[0].avgtempF}°F</p>
<p><strong>Max Temperature:</strong> ${weather.weather[0].maxtempF}°F</p>
<p><b>Min Temperature:</b> ${weather.weather[0].mintempF}°F</p>`;
  
document.querySelector("#tomorrow").innerHTML = `<h3>Tomorrow</h3>
<p><b>Average Temperature:</b> ${weather.weather[1].avgtempF}°F</p>
<p><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF}°F</p>
<p><b>Min Temperature:</b> ${weather.weather[1].mintempF}°F</p>`;

document.querySelector("#dayAfter").innerHTML = `<h3>Day After Tomorrow</h3>
<p><b>Average Temperature:</b> ${weather.weather[2].avgtempF}°F</p>
<p><strong>Max Temperature:</strong> ${weather.weather[2].maxtempF}°F</p>
<p><b>Min Temperature:</b> ${weather.weather[2].mintempF}°F</p>`;
            });
          });
        }
      });
    
event.target.reset();
});