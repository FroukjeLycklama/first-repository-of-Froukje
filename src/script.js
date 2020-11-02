//Display the current date and time
function displayDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();

  return `${day}, ${month} ${date}`;
}

function showCurrentTime(now) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes > 10) {
    return `${hours}:${minutes}`;
  } else {
    return `${hours}:0${minutes}`;
  }
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = displayDate(new Date());

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = showCurrentTime(new Date());

//Enter city and display

function enterCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#currentCity");
  let cityInput = document.querySelector(".city-input");

  cityElement.innerHTML = `${cityInput.value}`;

  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

function weather(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureShow = document.querySelector("#temperature");
  temperatureShow.innerHTML = `${temperature}`;
  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = response.data.name;
  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "b023fd56f40d9be792595f31c41a1fe8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weather);
}

function showPosition(position) {
  let cityElement = document.querySelector("#currentCity");
  let cityInput = document.querySelector(".city-input");

  cityElement.innerHTML = `${cityInput.value}`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b023fd56f40d9be792595f31c41a1fe8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector(".currentButton");
button.addEventListener("click", getCurrentPosition);

//converting celcius and fahrenheit
function convertCelciusToFahrenheit(response) {
  let temperatureShow = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureShow.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}°F `;
}
function searchCity(city) {
  let apiKey = "b023fd56f40d9be792595f31c41a1fe8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(convertCelciusToFahrenheit);
}

let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", searchCity);
