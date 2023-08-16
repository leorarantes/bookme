import { useState, createContext } from 'react';

interface BookProviderProps {
    children: React.ReactNode
}

export interface Book {
    timeSlotId?: number;
    insurance?: {
        id: number;
        number: string;
    }
    doctorName?: string;
    patient?: {
        name: string;
        phone: string;
    };
};

export interface BookContext {
    date: string | null;
    setDate: (newValue: string | null) => void;
    time: string | null;
    setTime: (newValue: string | null) => void;
    protocol: string | null;
    setProtocol: (newValue: string | null) => void;
}

export const BookContext = createContext<BookContext | null>(null);

export function BookProvider({ children }: BookProviderProps) {
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [protocol, setProtocol] = useState<string | null>(null);

    return (
        <BookContext.Provider value={{ date, setDate, time, setTime, protocol, setProtocol }}>
            {children}
        </BookContext.Provider>
    );
}