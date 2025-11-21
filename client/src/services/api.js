import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Items API
export const getItems = () => api.get('/items');
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (data) => api.post('/items', data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);

// Lagu API
export const getLagu = () => api.get('/lagu');
export const getLaguById = (id) => api.get(`/lagu/${id}`);
export const createLagu = (data) => api.post('/lagu', data);
export const updateLagu = (id, data) => api.put(`/lagu/${id}`, data);
export const deleteLagu = (id) => api.delete(`/lagu/${id}`);

export default api;