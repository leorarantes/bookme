import axios from "axios";

export interface ServicePartialData {
    id: string;
    data: string;
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

const api = {
    getServices
}

export default api;