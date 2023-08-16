import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './components/ErrorBoundary/ErrorPage';
import { ServiceProvider } from './contexts/ServiceContext';
import { AlertProvider } from './contexts/AlertContext';
import Alert from './components/Alert';
import Services from './pages/Services';
import Service from './pages/Service';
import MonthSchedule from './pages/MonthSchedule';

function App() {
  return (
    <AlertProvider>
      <ServiceProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/servicos/:serviceName" element={<Service />} />
              <Route path="/servicos/:serviceName/agenda/mes-ano/:monthYear" element={<MonthSchedule />} />
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
