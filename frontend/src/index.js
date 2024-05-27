import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <ThemeProvider theme={Theme}>
  <UserProvider>
  <Router>
    <App />
  </Router>
  </UserProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();