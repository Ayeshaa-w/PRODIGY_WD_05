const apiKey = "d30dccaa21f5d8fdd414f008a5a2725b"; // Replace with OpenWeatherMap API key
const notification = document.getElementById("notification");
const cityName = document.getElementById("city-name");
const currentDate = document.getElementById("current-date");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const forecastContainer = document.getElementById("forecast-container");
const toggleUnitButton = document.getElementById("toggle-unit");
const resetLocationButton = document.getElementById("reset-location");

let currentUnit = "metric"; // Default to metric (Celsius)

// Format a date
function formatDate(date) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

// Fetch weather data
function fetchWeather(city, unit = "metric") {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        showNotification("City not found!");
        return;
      }
      hideNotification();
      displayCurrentWeather(data, unit);
      fetchForecast(data.coord.lat, data.coord.lon, unit);
    })
    .catch(() => showNotification("Error fetching weather data."));
}

// Fetch forecast data
function fetchForecast(lat, lon, unit = "metric") {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(() => showNotification("Error fetching forecast data."));
}

// Display current weather
function displayCurrentWeather(data, unit) {
  cityName.textContent = data.name;
  currentDate.textContent = formatDate(new Date());
  const temp = Math.round(data.main.temp);
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  temperature.textContent = `${temp}${unitSymbol}`;
  weatherDescription.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  toggleUnitButton.textContent = `Switch to ${unit === "metric" ? "°F" : "°C"}`;

  // Change background based on weather
  document.body.style.background = getBackgroundTheme(data.weather[0].main);
}

// Display forecast
function displayForecast(data) {
  forecastContainer.innerHTML = "";
  
  // Get today's date
  const today = new Date();
  const currentDate = today.toLocaleDateString();

  // Filter out today's forecast and select only the next 5 days
  const dailyForecasts = data.list.filter((forecast, index) => {
    const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();
    return forecastDate !== currentDate && index % 8 === 0;
  }).slice(0, 5); // Limit to 5 days

  dailyForecasts.forEach(forecast => {
    const date = new Date(forecast.dt_txt);
    const day = date.toLocaleDateString(undefined, { weekday: "long" });
    const fullDate = date.toLocaleDateString(); // Standard date format (e.g., 1/25/2025)
    const icon = forecast.weather[0].icon;
    const temp = Math.round(forecast.main.temp);
    const weatherDescription = forecast.weather[0].description; // Get the weather description

    forecastContainer.innerHTML += `
      <div class="day">
        <p>${day}, ${fullDate}</p> <!-- Added full date here -->
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
        <p>${temp}°</p>
        <p class="weather-description">${weatherDescription}</p> <!-- Added weather description -->
      </div>
    `;
  });
}




// Unit toggle functionality
toggleUnitButton.addEventListener("click", () => {
  currentUnit = currentUnit === "metric" ? "imperial" : "metric";
  const city = cityName.textContent || "London";
  fetchWeather(city, currentUnit);
});

// Reset location functionality
resetLocationButton.addEventListener("click", () => {
  getUserLocationWeather();
});

// Show error notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.add("show");
}

// Hide error notification
function hideNotification() {
  notification.classList.remove("show");
}

// Dynamic background based on weather condition
function getBackgroundTheme(weather) {
  switch (weather) {
    case "Clear":
      return "linear-gradient(to bottom, #e0eefa, #f7d64b)";
    case "Rain":
      return "linear-gradient(to bottom, #7089b8, #5e6f87)";
    case "Snow":
      return "linear-gradient(to bottom, #e0eefa, #a1c6ff)";
    case "Clouds":
      return "linear-gradient(to bottom, #d6d7e1, #b0b8cd)";
    default:
      return "linear-gradient(to bottom, #e0eefa, #b2d1e9)";
  }
}

// Automatically fetch weather for the user's location
function getUserLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude, currentUnit);
    }, () => showNotification("Unable to fetch location!"));
  } else {
    showNotification("Geolocation not supported by your browser!");
  }
}

// Fetch weather by coordinates
function fetchWeatherByCoords(lat, lon, unit) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data, unit);
      fetchForecast(lat, lon, unit);
    })
    .catch(() => showNotification("Error fetching weather by location."));
}

// Initialize app
getUserLocationWeather();
document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("search-input").value;
  fetchWeather(city, currentUnit);
});
 