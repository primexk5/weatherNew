const API_KEY = 'dce67ecf0b30275697565afff5e51d85'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const searchInput = document.getElementById('search-input');
const cityDisplay = document.getElementById('city');
const temperatureDisplay = document.getElementById('main-temp');
const conditionDisplay = document.getElementById('condition');
const humidityDisplay = document.getElementById('humidity');
const windSpeedDisplay = document.getElementById('wind-speed');
const dateDisplay = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');


const searchButton = document.getElementById('search-button');

const weatherIcons = {
    'Clear': '/assets/sun.png',
    'Clouds': '/assets/cloudy.png',
    'Rain': '/assets/rainy.png',
    'Snow': '/assets/snowy.png',
    'Thunderstorm': '/assets/weather.png',
    // 'Drizzle': '/assets/rainy.png',
    // 'Mist': '/assets/mist.png'
};

function formatDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const now = new Date();
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${day}, ${month} ${year}`;
}

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function updateUI(data) {
    cityDisplay.textContent = data.name;
    temperatureDisplay.innerHTML = `${Math.round(data.main.temp)} <b class="align-top text-2xl lg:text-4xl">°C</b>`;
    conditionDisplay.textContent = data.weather[0].main;
    humidityDisplay.textContent = `${data.main.humidity}%`;
    windSpeedDisplay.textContent = `${data.wind.speed} m/s`;
    dateDisplay.textContent = formatDate();
    
    const weatherCondition = data.weather[0].main;
    weatherIcon.src = weatherIcons[weatherCondition] || weatherIcons['Clouds'];
}

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not find weather data for this city. Please try again.');
        return null;
    }
}


async function handleSearch(event) {
  
    if (event.type === 'click' || event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            const weatherData = await fetchWeatherData(city);
            if (weatherData) {
                updateUI(weatherData);
                searchInput.value = ''; 
            }
        }
    }
}

function initApp() {
    dateDisplay.textContent = formatDate();
    
    searchInput.addEventListener('keypress', handleSearch);
    searchButton.addEventListener('click', handleSearch);
    fetchWeatherData('Jos').then(data => {
        if (data) {
            updateUI(data);
        }
    });
}

initApp();