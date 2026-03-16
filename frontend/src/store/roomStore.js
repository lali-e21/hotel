import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

const useRoomStore = create((set) => ({
    rooms: [],
    currentRoom: null,
    isLoading: false,
    error: null,

    fetchRooms: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/rooms');
            set({ rooms: response.data.data.rooms, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchRoomById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/rooms/${id}`);
            set({ currentRoom: response.data.data.room, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createRoom: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.post('/rooms', formData, {
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

    updateRoom: async (id, formData) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.patch(`/rooms/${id}`, formData, {
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

    deleteRoom: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            await api.delete(`/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    }
}));

export default useRoomStore;
