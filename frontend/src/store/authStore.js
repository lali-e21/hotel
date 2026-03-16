import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/login', { email, password });
                    const { token, data } = response.data;
                    set({
                        user: data.user,
                        token,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return true;
                } catch (error) {
                    set({
                        error: error.response?.data?.message || 'Login failed',
                        isLoading: false
                    });
                    return false;
                }
            },

            register: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/register', userData);
                    const { token, data } = response.data;
                    set({
                        user: data.user,
                        token,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return true;
                } catch (error) {
                    set({
                        error: error.response?.data?.message || 'Registration failed',
                        isLoading: false
                    });
                    return false;
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },

            updateUser: (updatedUser) => {
                set({ user: { ...get().user, ...updatedUser } });
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
