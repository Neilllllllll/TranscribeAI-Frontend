import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals.js';

// Import des pages
import NotFound from './pages/NotFound.tsx';
import App from './App.tsx';
import AudioTranscriptionScreen from './pages/AudioTranscriptionScreen.tsx';

// MUI Imports pour le thème
import { CssBaseline } from '@mui/material';
import DarkTheme from './DarkTheme.js';
import { ThemeProvider } from '@mui/material';

// Configuration du routeur
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {path:"/", element:<App/>},
  {path:"/AudioTranscription", element:<AudioTranscriptionScreen/>},
  {path:"*", element:<NotFound/>}
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline /> {/* Réinitialise les styles pour cohérence */}
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
