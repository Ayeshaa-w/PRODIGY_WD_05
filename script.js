const apiKey = "d30dccaa21f5d8fdd414f008a5a2725b"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const notification = document.getElementById("notification");
const weatherImg = document.getElementById("weather-img");
const tempElement = document.getElementById("temp");
const unitElement = document.getElementById("unit");
const weatherCondition = document.getElementById("weather-condition");
const humidityElement = document.getElementById("humidity");
const uvIndexElement = document.getElementById("uv-index");
const toggleUnitButton = document.getElementById("toggle-unit");

let isCelsius = true;

// Notify users about location permissions
if ("geolocation" in navigator) {
  notification.textContent = "Please allow location access for accurate weather updates.";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      notification.textContent = "Location access granted!";
      fetchWeatherByCoords(latitude, longitude);
    },
    () => {
      notification.textContent = "Location access denied. Search manually.";
    }
  );
} else {
  notification.textContent = "Geolocation is not supported by your browser.";
}

// Fetch weather data by city
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeatherData(city);
});

// Fetch weather data by coordinates
function fetchWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      return response.json();
    })
    .then((data) => updateWeatherUI(data))
    .catch(() => {
      notification.textContent = "Unable to fetch weather data.";
    });
}

// Fetch and update weather data
function fetchWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then((data) => updateWeatherUI(data))
    .catch(() => {
      notification.textContent = "City not found. Please try again.";
    });
}

function updateWeatherUI(data) {
  const { name, main, weather } = data;

  // Update current weather
  document.getElementById("city-name").textContent = name;
  tempElement.textContent = Math.round(main.temp);
  weatherCondition.textContent = weather[0].description;
  weatherImg.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  humidityElement.textContent = `Humidity: ${main.humidity}%`;

  // Change background based on humidity
  updateBackground(main.humidity);
}

// Toggle temperature unit
toggleUnitButton.addEventListener("click", () => {
  if (isCelsius) {
    tempElement.textContent = Math.round((tempElement.textContent * 9) / 5 + 32);
    unitElement.textContent = "F";
    toggleUnitButton.textContent = "Switch to °C";
  } else {
    tempElement.textContent = Math.round(((tempElement.textContent - 32) * 5) / 9);
    unitElement.textContent = "C";
    toggleUnitButton.textContent = "Switch to °F";
  }
  isCelsius = !isCelsius;
});

function updateBackground(humidity) {
  if (humidity < 40) {
    document.body.style.background = "linear-gradient(to bottom, #e0f7fa, #80deea)";
  } else if (humidity < 70) {
    document.body.style.background = "linear-gradient(to bottom, #f3e5f5, #ce93d8)";
  } else {
    document.body.style.background = "linear-gradient(to bottom, #ffebee, #ef9a9a)";
  }
}
