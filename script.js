const apiKey = "a7a73fef95e03492782533ef2ee3e5ec";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.querySelector('.loader'); 

async function checkWeather(city) {

    loader.style.display = 'block';

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    loader.style.display = 'none';

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; 

        console.log(data.weather[0].main);
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "img/mist.png";
        } else {
            weatherIcon.src = "img/default.png"; 
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").innerHTML = "Please enter a city name";
    }
});

