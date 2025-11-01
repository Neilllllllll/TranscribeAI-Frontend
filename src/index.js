import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// Importation des pages
import NotFound from './pages/NotFound';
import App from './App';
import Transcribe from './pages/Transcribe';
import ThemePreview from './components/ThemePreview';
import Menu from './pages/Menu.js';

// MUI Imports pour le thème
import { CssBaseline } from '@mui/material';
import theme from './Theme';
import { ThemeProvider } from '@mui/material';

// Configuration du routeur
import {createBrowserRouter, RouterProvider} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {path:"/", element:<App/>},
  {path:"/Transcribe", element:<Transcribe/>},
  {path:"*", element:<NotFound/>},
  {path:"/Theme-preview", element:<ThemePreview/>},
  {path: "/Menu", element :<Menu/>}
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Réinitialise les styles pour cohérence */}
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
