import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

const useServiceStore = create((set) => ({
    services: [],
    isLoading: false,
    error: null,

    fetchServices: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/services');
            set({ services: response.data.data.services, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createService: async (serviceData) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.post('/services', serviceData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateService: async (id, serviceData) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.patch(`/services/${id}`, serviceData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    deleteService: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.delete(`/services/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    }
}));

export default useServiceStore;
