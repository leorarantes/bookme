import { useState, createContext } from 'react';

interface AlertProviderProps {
  children: React.ReactNode
}

export type AlertType = 'error' | 'warning' | 'success';

export interface AlertContext {
  isActive: boolean;
  setIsActive: (newValue: boolean) => void;
  fadeOut: boolean;
  setFadeOut: (newValue: boolean) => void;
  message: string | null;
  setMessage: (newValue: string | null) => void;
  type: AlertType | null;
  setType: (newValue: AlertType | null) => void;
}

export const AlertContext = createContext<AlertContext | null>(null);

export function AlertProvider({ children }: AlertProviderProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [fadeOut, setFadeOut] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<AlertType | null>(null);

    return (
      <AlertContext.Provider value={{
        isActive,
        setIsActive,
        fadeOut,
        setFadeOut,
        message,
        setMessage,
        type,
        setType
      }}>
        {children}
      </AlertContext.Provider>
    );
}