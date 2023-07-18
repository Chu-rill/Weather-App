const apiKey = "a9cee6e7646a14aded9f833020876af6";
const weatherData = document.querySelector("#weather-data");
const cityInput = document.querySelector("#city-input");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInput.value;
  console.log(cityValue);
  getWeatherApiData(cityValue);
});

async function getWeatherApiData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like - 273.15)}°C`, // Convert feels like temperature to Celsius
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${Math.round(data.wind.speed)}m/s`,
    ];

    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" />`;
    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherData.querySelector(".description").textContent = description;
    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";
    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent = "An error occurred";
    weatherData.querySelector(".details").innerHTML = "";
  }
}
