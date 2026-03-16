import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

const useAdminStore = create((set) => ({
    stats: null,
    bookings: [],
    payments: [],
    promos: [],
    isLoading: false,
    error: null,

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const token = useAuthStore.getState().token;
            const response = await api.get('/admin/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ stats: response.data.data.stats, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchBookings: async () => {
        set({ isLoading: true });
        try {
            const token = useAuthStore.getState().token;
            const response = await api.get('/admin/bookings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ bookings: response.data.data.bookings, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    fetchPayments: async () => {
        set({ isLoading: true });
        try {
            const token = useAuthStore.getState().token;
            const response = await api.get('/admin/payments', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ payments: response.data.data.payments, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    updateBookingStatus: async (id, status) => {
        set({ isLoading: true });
        try {
            const token = useAuthStore.getState().token;
            await api.patch(`/admin/bookings/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    fetchPromos: async () => {
        set({ isLoading: true });
        try {
            const token = useAuthStore.getState().token;
            const response = await api.get('/promos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ promos: response.data.data.promos, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    createPromo: async (promoData) => {
        set({ isLoading: true });
        try {
            const token = useAuthStore.getState().token;
            await api.post('/promos', promoData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    togglePromo: async (id) => {
        try {
            const token = useAuthStore.getState().token;
            await api.patch(`/promos/${id}/toggle`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            throw error;
        }
    },

    deletePromo: async (id) => {
        try {
            const token = useAuthStore.getState().token;
            await api.delete(`/promos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            throw error;
        }
    }
}));

export default useAdminStore;
