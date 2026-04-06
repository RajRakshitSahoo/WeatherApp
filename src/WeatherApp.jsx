import { useState } from 'react';
import InfoBox from './InfoBox';
import SearchBox from './SearchBox';
import './WeatherApp.css';

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    feels_like: 34.93,
    humidity: 83,
    temp: 28.84,
    tempMax: 28.84,
    tempMin: 28.84,
    weather: "haze",
  });

  const updatedInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="WeatherApp">
      <h1 className="weather-title">⛅ WeatherNow</h1>
      <p className="weather-subtitle">Real-time weather at your fingertips</p>
      <SearchBox updatedInfo={updatedInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}