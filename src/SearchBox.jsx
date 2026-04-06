import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updatedInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d00460c6f753a6faec0c61e08c6ac43b";

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const responseJson = await response.json();
      const result = {
        city: city,
        temp: responseJson.main.temp,
        tempMin: responseJson.main.temp_min,
        tempMax: responseJson.main.temp_max,
        humidity: responseJson.main.humidity,
        feels_like: responseJson.main.feels_like,
        weather: responseJson.weather[0].description,
      };
      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
    if (error) setError(false);
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      const newInfo = await getWeatherInfo();
      if (newInfo) {
        updatedInfo(newInfo);
        setCity("");
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form className="search-form" onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="Enter city name…"
          variant="outlined"
          value={city}
          onChange={handleChange}
          required
          fullWidth
          size="small"
        />
        <Button
          variant="contained"
          type="submit"
          className="search-btn"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </form>
      {error && (
        <p className="search-error">
          ⚠️ City not found. Please check the spelling and try again.
        </p>
      )}
    </div>
  );
}