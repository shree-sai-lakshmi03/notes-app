import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Notes
export const getNotes = () => API.get('/notes');
export const createNote = (data) => API.post('/notes', data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);