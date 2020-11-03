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

//adding icons
let iconDescription = [
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
let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

function weather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureShow = document.querySelector("#temperature");
  let cityElement = document.querySelector("#currentCity");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  temperatureShow.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "class",
    iconDescription[0][response.data.weather[0].icon]
  );
  console.log(response.data.weather[0].icon);
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
