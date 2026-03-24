import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth headers
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const role = localStorage.getItem('nova_role');
        const username = import.meta.env.VITE_ADMIN_USERNAME as string | undefined;
        const password = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

        if (role === 'admin' && username && password) {
            const credentials = btoa(`${username}:${password}`);
            config.headers.Authorization = `Basic ${credentials}`;
            return config;
        }

        const token = localStorage.getItem('nova_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }

        if (username && password) {
            const credentials = btoa(`${username}:${password}`);
            config.headers.Authorization = `Basic ${credentials}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('nova_token');
            localStorage.removeItem('nova_user');
            localStorage.removeItem('nova_role');
            localStorage.removeItem('adminAuth');
        }
        return Promise.reject(error);
    }
);

export default api;
