import React, { useState } from 'react';
import ErrorPage from './ErrorPage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorBoundary({children}: ErrorBoundaryProps) {
  const [error, setError] = useState<any>(null);

  function errorHandler(error: any) {
    console.error(error.reason);
    setError(error.reason);
  };

  window.addEventListener('error', errorHandler);
  window.addEventListener('unhandledrejection', errorHandler);

  if (error) {
    window.removeEventListener('error', errorHandler);
    window.removeEventListener('unhandledrejection', errorHandler);
    return <ErrorPage />;
  }

  return <>{children}</>;
};

export default ErrorBoundary;