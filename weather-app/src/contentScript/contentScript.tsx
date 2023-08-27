import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import WeatherCard from '../components/WeatherCard';
import './contentScript.css';
import { Card, CardContent, Typography } from '@material-ui/core';
import { LocalStorageOptions, getStoredOptions } from '../utils/storage';
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlay-card">
          <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
        </Card>
      )}
    </>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
