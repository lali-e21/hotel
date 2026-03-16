import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

const useGalleryStore = create((set) => ({
    galleryItems: [],
    isLoading: false,
    error: null,

    fetchGalleryItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/gallery');
            set({ galleryItems: response.data.data.galleryItems, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createGalleryItem: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.post('/gallery', formData, {
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

    deleteGalleryItem: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.delete(`/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateGalleryItem: async (id, formData) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.patch(`/gallery/${id}`, formData, {
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
    }
}));

export default useGalleryStore;
