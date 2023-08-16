import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/poppins.css';
import './assets/sass/main.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);