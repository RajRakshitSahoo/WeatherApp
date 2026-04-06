import Card from '@mui/material/Card';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';

import './InfoBox.css';

const HOT_URL =
  "https://media.istockphoto.com/id/1224021113/photo/indian-cameleers-camel-driver-with-camel-silhouettes-in-dunes-on-sunset-jaisalmer-rajasthan.webp?a=1&b=1&s=612x612&w=0&k=20&c=DgMNlnNSzsOfPvu3OSDGUg1oJTwpXyc0gbmI9N_a-c0=";
const RAINY_URL =
  "https://images.unsplash.com/photo-1600896476628-8d10a6ddbd1f?w=600&auto=format&fit=crop&q=60";
const WINTER_URL =
  "https://plus.unsplash.com/premium_photo-1670356694351-dcfc50b7547c?w=600&auto=format&fit=crop&q=60";

export default function InfoBox({ info }) {
  const isRainy = info.humidity > 80;
  const isHot   = info.temp > 15;

  const weatherImage = isRainy ? RAINY_URL : isHot ? HOT_URL : WINTER_URL;

  const WeatherIcon = () => {
    if (isRainy) return <ThunderstormIcon sx={{ fontSize: 24, color: '#93c5fd' }} />;
    if (isHot)   return <WbSunnyIcon      sx={{ fontSize: 24, color: '#fbbf24' }} />;
    return             <AcUnitIcon        sx={{ fontSize: 24, color: '#7dd3fc' }} />;
  };

  const stats = [
    {
      label: 'Temperature',
      value: `${info.temp}°C`,
      icon: <ThermostatIcon sx={{ fontSize: 16, color: '#a78bfa' }} />,
      isMain: true,
    },
    {
      label: 'Feels Like',
      value: `${info.feels_like}°C`,
      icon: <DeviceThermostatIcon sx={{ fontSize: 16, color: '#38bdf8' }} />,
    },
    {
      label: 'Humidity',
      value: `${info.humidity}%`,
      icon: <WaterDropIcon sx={{ fontSize: 16, color: '#34d399' }} />,
    },
    {
      label: 'Wind / Condition',
      value: info.weather,
      icon: <AirIcon sx={{ fontSize: 16, color: '#f472b6' }} />,
    },
    {
      label: 'Min / Max Temp',
      value: `${info.tempMin}°C  ·  ${info.tempMax}°C`,
      fullWidth: true,
    },
  ];

  return (
    <div className="InfoBox">
      <Card className="weather-card" elevation={0}>
        {/* ── Hero image ── */}
        <div className="card-media-wrapper">
          <img src={weatherImage} alt="weather" />
          <div className="card-media-overlay" />
          <div className="city-on-image">
            <span>{info.city}</span>
            <div className="weather-icon-badge">
              <WeatherIcon />
            </div>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-chip${s.fullWidth ? ' full-width' : ''}`}
            >
              <span className="stat-label">
                {s.icon && <span style={{ marginRight: 4, verticalAlign: 'middle' }}>{s.icon}</span>}
                {s.label}
              </span>
              <span className={`stat-value${s.isMain ? ' temp-main' : ''}`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
