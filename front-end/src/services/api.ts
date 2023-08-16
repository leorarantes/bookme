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

const api = {
    getServices,
    getService,
    getMonthSchedule
}

export default api;