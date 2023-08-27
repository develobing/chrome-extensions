import React, { useEffect, useState } from 'react';
import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchOpenWeatherData,
  getWeatherIconSrc,
} from '../../utils/api';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';
import './WeatherCard.css';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx="4px" my="16px">
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button size="small" color="secondary" onClick={onDelete}>
              <Typography className="weather-card-body">Delete</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = 'loading' | 'error' | 'ready';

interface WeatherCardProps {
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  tempScale,
  onDelete,
}) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');

  if (!city) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weather-card-title">No City</Typography>
        <Typography className="weather-card-body">Please add a city</Typography>
      </WeatherCardContainer>
    );
  }

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        console.log('fetchOpenWeatherData() - data', data);
        setWeatherData(data);
        setCardState('ready');
      })
      .catch((error) => {
        console.log('fetchOpenWeatherData() - error', error);
        setCardState('error');
      });
  }, [city, tempScale]);

  if (cardState === 'loading' || cardState === 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weather-card-title">{city}</Typography>
        <Typography className="weather-card-body">
          {cardState === 'loading'
            ? 'Loading...'
            : 'Error: Could not retrieve weather data for this city.'}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justify="space-around">
        <Grid item>
          <Typography className="weather-card-title">
            {weatherData.name}
          </Typography>
          <Typography className="weather-card-temp">
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography className="weather-card-body">
            Feels like {Math.round(weatherData.main.feels_like)}
          </Typography>
        </Grid>

        <Grid item>
          {weatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
              <Typography className="weather-card-body">
                {weatherData.weather[0].main}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
