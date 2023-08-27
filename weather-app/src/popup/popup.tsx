import { Box, Grid, IconButton, InputBase, Paper } from '@material-ui/core';
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from '@material-ui/icons';
import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  LocalStorageOptions,
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from '../utils/storage';
import WeatherCard from '../components/WeatherCard';
import './popup.css';
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (!cityInput) return;

    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options?.tempScale === 'metric' ? 'imperial' : 'metric',
    };

    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  const handleOverlayButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
      }
    });
  };

  if (!options) return null;

  return (
    <Box mx="8px" my="16px">
      <Grid container justify="space-evenly">
        <Grid item xs={8}>
          <Paper>
            <Box className="city-input-box" px="15px" py="5px">
              <InputBase
                className="city-input"
                placeholder="Add a city name"
                inputProps={{ 'aria-label': 'add a city' }}
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCityButtonClick();
                }}
              />

              <IconButton aria-label="add" onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <Box py="2px">
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item>
          <Paper>
            <Box py="5px">
              <IconButton onClick={handleOverlayButtonClick}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {options.homeCity != '' && (
        <WeatherCard
          key={options.homeCity}
          city={options.homeCity}
          tempScale={options.tempScale}
        />
      )}

      {cities.map((city, index) => (
        <WeatherCard
          key={index}
          city={city}
          tempScale={options.tempScale}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}

      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
