async function getWeather(city) {
    const apiKey = "90b0f32fd8014b70a8112348230708";
    const apiUrl = "http://api.weatherapi.com/v1/current.json?key=90b0f32fd8014b70a8112348230708&q={city}&aqi=no";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById("cloudInfo").innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${data.main.temp} &deg;C</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById('cloudInfo').innerHTML = `
                <p>City not found. Please check the city name and try again.</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('cloudInfo').innerHTML = `
            <p>Oops! Something went wrong. Please try again later.</p>
        `;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const city = document.getElementById("city").value;
    getWeather(city);
}

async function handleLocation() {
    const city = document.getElementById("city").value;
    try {
        const response = await fetch('http://localhost:3000/locations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ city }),
        });
    if (response.ok) {
        console.log("Location successful!");
    } else {
        console.error("Location failed.");
    }
    }catch (error) {
        console.error("Error searching location")
    }
    }
async function handleForecast() {
    const city = document.getElementById("forecasts").value;

    try {
        const response = await fetch("http://localhost:3000/forecasts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ city }),
        });

        if (response.ok) {
            console.log("Forecast data loaded successfully!");
        } else {
            console.error("Failed to load forecast data.");
        }
    } catch (error) {
        console.error("There was an error loading forecast data:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cloudForm = document.getElementById('cloudForm');
    cloudForm.addEventListener("submit", handleSubmit);

    const locationBtn = document.getElementById("locationBtn");
    locationBtn.addEventListener("click", handleLocation);

    const forecastBtn = document.getElementById("forecastBtn");
    forecastBtn.addEventListener("click", handleForecast);
});

