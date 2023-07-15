import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [city, setCity] = useState(''); // State for storing the entered city name
  const [currentWeather, setCurrentWeather] = useState(null); // State for storing the current weather data
  const [forecast, setForecast] = useState(null); // State for storing the 5-day forecast data
  const [isCelsius, setIsCelsius] = useState(true); // State for tracking the unit (Celsius or Fahrenheit) display
  const OpenAPI_KEY = '44259cf663167b2188b746c3ad011f2f';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OpenAPI_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
        );
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=YOUR_WEATHER_API_KEY&units=${isCelsius ? 'metric' : 'imperial'}`
        );
        const data = await response.json();
        setForecast(data.list);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };

    // Fetch weather and forecast data when the city or unit changes
    if (city) {
      fetchWeather();
      fetchForecast();
    }
  }, [city, isCelsius]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleUnitToggle = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={handleCityChange} placeholder="Enter a city" />
      <button onClick={handleUnitToggle}>{isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}</button>
      
      {currentWeather && (
        <div>
          <h2>Current Weather in {city}</h2>
          <p>Temperature: {currentWeather.main.temp} {isCelsius ? '°C' : '°F'}</p>
          <p>Min Temperature: {currentWeather.main.temp_min} {isCelsius ? '°C' : '°F'}</p>
          <p>Max Temperature: {currentWeather.main.temp_max} {isCelsius ? '°C' : '°F'}</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
          <p>Wind Direction: {currentWeather.wind.deg}°</p>
          <p>Description: {currentWeather.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      )}

      {forecast && (
        <div>
          <h2>5-day Forecast for {city}</h2>
          {forecast.map((data) => (
            <div key={data.dt}>
              <p>Date: {new Date(data.dt * 1000).toLocaleDateString()}</p>
              <p>Average Temperature: {data.main.temp} {isCelsius ? '°C' : '°F'}</p>
              <p>Description: {data.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather Icon" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
