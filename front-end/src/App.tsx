import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './components/ErrorBoundary/ErrorPage';
import { ServiceProvider } from './contexts/ServiceContext';
import { AlertProvider } from './contexts/AlertContext';
import Alert from './components/Alert';

function App() {
  return (
    <AlertProvider>
      <ServiceProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Alert />
          </ErrorBoundary>
        </BrowserRouter>
      </ServiceProvider>
    </AlertProvider>
  );
}

export default App;
