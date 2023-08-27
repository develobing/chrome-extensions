import 'fontsource-roboto';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './options.css';
import {
  Card,
  CardContent,
  TextField,
  Grid,
  Typography,
  Box,
  Button,
  Switch,
} from '@material-ui/core';
import {
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      homeCity,
    };
    setOptions(updatedOptions);
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      hasAutoOverlay,
    };
    setOptions(updatedOptions);
  };

  const handleSaveButtonClick = () => {
    const isValidOptions = options?.homeCity;
    if (!isValidOptions) return alert('Please enter a home city name');

    setFormState('saving');
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready');
      }, 750);
    });
  };

  if (!options) return null;

  const isFieldsDisabled = formState === 'saving';

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                fullWidth
                disabled={isFieldsDisabled}
                placeholder="Enter a home city name"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
              />
            </Grid>

            <Grid item>
              <Typography variant="body1">
                Auto Toggle Overlay on webpage load
              </Typography>
              <Switch
                color="primary"
                disabled={isFieldsDisabled}
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
              />
            </Grid>

            <Grid item>
              <Button
                disabled={isFieldsDisabled}
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
