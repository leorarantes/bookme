import axios from "axios";

export interface ServicePartialData {
    id: string;
    data: string;
};

export interface ServiceData {
    id: string;
    name: string;
    description: string;
    duration: string;
    professional: string;
    price: string;
    availability: string[];
};

export interface DayData {
    id: number;
    year: number;
    month: number;
    dayOfTheMonth: number;
    isAvailable: boolean;
};

export interface TimeSlotData {
    id: number;
    hourMinute: string;
};

export interface NewBookData {
    dateTime: {
        date: string;
        time: string;
    };
    clientData: {
        name: string;
        email: string;
        phone: string;
    };
    serviceId: string;
};

export interface NewBookData {
    dateTime: {
        date: string;
        time: string;
    };
    clientData: {
        name: string;
        email: string;
        phone: string;
    };
    serviceId: string;
};

export interface BookData {
    date: string;
    time: string;
    protocol: string;
};

const baseServiceAPI = axios.create({
    baseURL: process.env.REACT_APP_SERVICE_API_URL,
});

const baseScheduleAPI = axios.create({
    baseURL: process.env.REACT_APP_SCHEDULE_API_URL,
});

async function getServices() {
    const { data }: { data: ServicePartialData[] } = await baseServiceAPI.get('/service');
    return data;
}

async function getService(id: string) {
    const { data }: { data: ServiceData } = await baseServiceAPI.get(`/service/${id}`);
    return data;
}

async function getMonthSchedule(monthYear: string | null, id: string) {
    const { data }: { data: DayData[] } = await baseScheduleAPI.get(`/schedule/month/${monthYear}/${id}`);
    return data;
}

async function getDaySchedule(monthYear: string | null, day: string | null, id: string) {
    const { data }: { data: TimeSlotData[] } = await baseScheduleAPI.get(`/schedule/day/${day}-${monthYear}/${id}`);
    return data;
}

async function bookService(book: NewBookData) {
    const { data }: { data: BookData } = await baseScheduleAPI.post('/book', book);
    return data;
}

async function deleteBook(protocol: string) {
    await baseScheduleAPI.delete(`/book/${protocol}`);
}

const api = {
    getServices,
    getService,
    getMonthSchedule,
    getDaySchedule,
    bookService,
    deleteBook
}

export default api;