// state
let currCity = "Pamulang";
let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__pressure = document.querySelector(".weather__pressure");

// search
document.querySelector(".weather__search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");
  // prevent default action
  e.preventDefault();
  // change current city
  currCity = search.value;
  // get weather forecast
  getWeather();
  // clear form
  search.value = "";
});

// units
document
  .querySelector(".weather_unit_celsius")
  .addEventListener("click", () => {
    if (units !== "metric") {
      // change to metric
      units = "metric";
      // get weather forecast
      getWeather();
    }
  });

document
  .querySelector(".weather_unit_farenheit")
  .addEventListener("click", () => {
    if (units !== "imperial") {
      // change to imperial
      units = "imperial";
      // get weather forecast
      getWeather();
    }
  });

function convertTimeStamp(timestamp, timezone) {
  const date = new Date(timestamp);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

// Weather code mapping for Open-Meteo
function getWeatherDescription(weatherCode) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy", 
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow", 
    75: "Heavy snow",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail"
  };
  return weatherCodes[weatherCode] || "Unknown";
}

// Get weather icon based on weather code
function getWeatherIcon(weatherCode, isDay = true) {
  const iconMap = {
    0: isDay ? "01d" : "01n", // Clear sky
    1: isDay ? "01d" : "01n", // Mainly clear
    2: isDay ? "02d" : "02n", // Partly cloudy
    3: isDay ? "03d" : "03n", // Overcast
    45: isDay ? "50d" : "50n", // Fog
    48: isDay ? "50d" : "50n", // Rime fog
    51: isDay ? "09d" : "09n", // Light drizzle
    53: isDay ? "09d" : "09n", // Moderate drizzle
    55: isDay ? "09d" : "09n", // Dense drizzle
    61: isDay ? "10d" : "10n", // Slight rain
    63: isDay ? "10d" : "10n", // Moderate rain
    65: isDay ? "10d" : "10n", // Heavy rain
    71: isDay ? "13d" : "13n", // Slight snow
    73: isDay ? "13d" : "13n", // Moderate snow
    75: isDay ? "13d" : "13n", // Heavy snow
    80: isDay ? "09d" : "09n", // Rain showers
    81: isDay ? "09d" : "09n", // Moderate rain showers
    82: isDay ? "09d" : "09n", // Violent rain showers
    95: isDay ? "11d" : "11n", // Thunderstorm
    96: isDay ? "11d" : "11n", // Thunderstorm with hail
    99: isDay ? "11d" : "11n"  // Thunderstorm with heavy hail
  };
  return iconMap[weatherCode] || "01d";
}

// Convert temperature units
function convertTemperature(temp, fromUnit, toUnit) {
  if (fromUnit === toUnit) return temp;
  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    return (temp * 9/5) + 32;
  } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    return (temp - 32) * 5/9;
  }
  return temp;
}

function getWeather() {
  // Step 1: Get coordinates for the city using Open-Meteo Geocoding API
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${currCity}&count=1&language=en&format=json`)
    .then((res) => res.json())
    .then((locationData) => {
      if (locationData.results && locationData.results.length > 0) {
        const location = locationData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        
        // Step 2: Get weather data using coordinates
        const tempUnit = units === "imperial" ? "fahrenheit" : "celsius";
        const windUnit = units === "imperial" ? "mph" : "ms";
        
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            
            // Update UI
            city.innerHTML = `${location.name}, ${location.country}`;
            datetime.innerHTML = convertTimeStamp(data.current.time, 0);
            
            weather__forecast.innerHTML = `<p>${getWeatherDescription(data.current.weather_code)}</p>`;
            weather__temperature.innerHTML = `${Math.round(data.current.temperature_2m)}&#176`;
            
            const iconCode = getWeatherIcon(data.current.weather_code, data.current.is_day);
            weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@4x.png" />`;
            
            weather__minmax.innerHTML = `<p>Min: ${Math.round(data.daily.temperature_2m_min[0])}&#176</p><p>Max: ${Math.round(data.daily.temperature_2m_max[0])}&#176</p>`;
            weather__realfeel.innerHTML = `${Math.round(data.current.apparent_temperature)}&#176`;
            weather__humidity.innerHTML = `${data.current.relative_humidity_2m}%`;
            weather__wind.innerHTML = `${data.current.wind_speed_10m} ${units === "imperial" ? "mph" : "m/s"}`;
            weather__pressure.innerHTML = `${data.current.surface_pressure} hPa`;
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
          });
      } else {
        alert("City not found. Please check the city name and try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
      alert("Error finding location. Please check your internet connection.");
    });
}

// Load weather on page load
document.body.addEventListener("load", getWeather());