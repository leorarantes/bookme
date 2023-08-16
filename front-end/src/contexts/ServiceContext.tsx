import { useState, createContext } from 'react';

interface ServiceProviderProps {
  children: React.ReactNode
}

export interface ServiceContext {
  id: string | null;
  setId: (newValue: string) => void;
}

export const ServiceContext = createContext<ServiceContext | null>(null);

export function ServiceProvider({ children }: ServiceProviderProps) {
    const [id,  setId] = useState<string | null>(null);
    return (
      <ServiceContext.Provider value={{ id, setId }}>
        {children}
      </ServiceContext.Provider>
    );
}