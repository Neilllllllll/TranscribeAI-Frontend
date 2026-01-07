import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; 
import reportWebVitals from './reportWebVitals.js';

// MUI Imports
import { CssBaseline, ThemeProvider } from '@mui/material';
import DarkTheme from './DarkTheme.js';
import { router } from './Router.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();