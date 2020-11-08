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
  let temperatureShow = document.querySelector("#temperature");
  let cityElement = document.querySelector("#currentCity");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  let iconDescription4x = [
    {
      "01d": "fas fa-sun fa-4x", // day clear sky
      "01n": "fas fa-moon fa-4x", // night clear sky
      "02d": "fas fa-cloud-sun fa-4x", // day few clouds
      "02n": "fas fa-cloud-moon fa-4x", // night few clouds
      "03d": "fas fa-cloud fa-4x", // day	scattered clouds
      "03n": "fas fa-cloud fa-4x", // night scattered clouds
      "04d": "fas fa-cloud fa-4x", // day broken clouds
      "04n": "fas fa-cloud fa-4x", // night broken clouds
      "09d": "fas fa-cloud-sun-rain fa-4x", // day shower rain
      "09n": "fas fa-cloud-moon-rain fa-4x", // night shower rain
      "10d": "fas fa-cloud-rain fa-4x", // day rain
      "10n": "fas fa-cloud-rain fa-4x", // night rain
      "11d": "fas fa-bolt fa-4x", // day thunderstorm
      "11n": "fas fa-bolt fa-4x", // night thunderstorm
      "13d": "far fa-snowflake fa-4x", // day snow
      "13n": "far fa-snowflake fa-4x", // night snow
      "50d": "fas fa-smog fa-4x", // day mist
      "50n": "fas fa-smog fa-4x", // night mist
    },
  ];

  celciusTemperature = response.data.main.temp;

  temperatureShow.innerHTML = `${Math.round(celciusTemperature)} °C`;
  cityElement.innerHTML = `${response.data.name}:`;
  description.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "class",
    iconDescription4x[0][response.data.weather[0].icon]
  );
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;

  let iconDescription2x = [
    {
      "01d": "fas fa-sun fa-2x", // day clear sky
      "01n": "fas fa-moon fa-2x", // night clear sky
      "02d": "fas fa-cloud-sun fa-2x", // day few clouds
      "02n": "fas fa-cloud-moon fa-2x", // night few clouds
      "03d": "fas fa-cloud fa-2x", // day	scattered clouds
      "03n": "fas fa-cloud fa-2x", // night scattered clouds
      "04d": "fas fa-cloud fa-2x", // day broken clouds
      "04n": "fas fa-cloud fa-2x", // night broken clouds
      "09d": "fas fa-cloud-sun-rain fa-2x", // day shower rain
      "09n": "fas fa-cloud-moon-rain fa-2x", // night shower rain
      "10d": "fas fa-cloud-rain fa-2x", // day rain
      "10n": "fas fa-cloud-rain fa-2x", // night rain
      "11d": "fas fa-bolt fa-2x", // day thunderstorm
      "11n": "fas fa-bolt fa-2x", // night thunderstorm
      "13d": "far fa-snowflake fa-2x", // day snow
      "13n": "far fa-snowflake fa-2x", // night snow
      "50d": "fas fa-smog fa-2x", // day mist
      "50n": "fas fa-smog fa-2x", // night mist
    },
  ];

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];

    forecastElement.innerHTML += `<div class="col forecast">
        <h5>${formatHours(forecast.dt * 1000)}</h5>
  <div class="forecast-icons">
        <i class="${iconDescription2x[0][forecast.weather[0].icon]}"></i>
        </div>
        <h5>${Math.round(forecast.main.temp)}°</h5>
    </div>`;
  }
}

function searchCity(city) {
  let apiKey = "b023fd56f40d9be792595f31c41a1fe8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showPosition(position) {
  let cityElement = document.querySelector("#currentCity");
  let cityInput = document.querySelector(".city-input");

  cityElement.innerHTML = `${cityInput.value}:`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b023fd56f40d9be792595f31c41a1fe8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector(".currentButton");
button.addEventListener("click", getCurrentPosition);

//converting celcius and fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = `${Math.round(
    (celciusTemperature * 9) / 5 + 32
  )} °F `;
  let temperatureShow = document.querySelector("#temperature");
  temperatureShow.innerHTML = fahrenheitTemperature;
}

function displayCelciusTemperature(event) {
  let temperatureShow = document.querySelector("#temperature");
  temperatureShow.innerHTML = `${Math.round(celciusTemperature)} °C`;
}

let celciusTemperature = null;

let FahrenheitLink = document.querySelector("#fahrenheit");
FahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let CelciusLink = document.querySelector("#celcius");
CelciusLink.addEventListener("click", displayCelciusTemperature);

searchCity("paris");
