// Show day and time of the day

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = "Paris";
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  SearchCity(cityInput.value);
}

let dateElement = document.querySelector("#local-time");
let currentDate = new Date();

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);

dateElement.innerHTML = formatDate(currentDate);

//Search City and display temperature
function SearchCity(city) {
  let units = "metric";
  let apiKey = "f849a290611306768174e22ee045bba6";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${roundedTemp}°C`;
}

// find my current location or position

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let weathDescrip = document.querySelector("#descript");
  let windSpeed = document.querySelector("#wind-speed");
  let tempHolder = document.querySelector("#current-temp");
  let cityHolder = document.querySelector("#city");
  weathDescrip.innerHTML = `${response.data.weather[0].description}`;
  windSpeed.innerHTML = `${response.wind.speed.value}`;
  tempHolder.innerHTML = `${temp}`;
  cityHolder.innerHTML = `${response.data.name}`;

  console.log(response.data);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f849a290611306768174e22ee045bba6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function searchPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let myLoc = document.querySelector("#current-location");
myLoc.addEventListener("click", searchPosition);
