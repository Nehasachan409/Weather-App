import React, { useEffect, useRef, useState } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import cloud_icon from '../assets/cloud.png';
import clear_icon from '../assets/clear.png';
import wind_icon from '../assets/wind.png';
import drizzle_icon from '../assets/drizzle.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    humidity: 0,
    temprature: 0,
    windSpeed: 0,
    location: '',
    icon: clear_icon,
  });

  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  const search = async (city) => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    try {
    const API_KEY = import.meta.env.VITE_APP_ID;

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather?.[0]?.icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        temprature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    search('Delhi'); // default city on load
  }, []);

  return (
    <div className='weather'>
      <div className='search'>
        <input ref={inputRef} type='text' placeholder='Enter City' />
        <img src={search_icon} alt='search' onClick={() => search(inputRef.current.value)} />
      </div>

      <img src={weatherData.icon} className='weather-icon' alt='weather' />
      <p className='temp'>{weatherData.temprature}&#8451;</p>
      <p className='location'>{weatherData.location}</p>

      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt='humidity' />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt='wind' />
          <div>
            <p>{weatherData.windSpeed} km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
