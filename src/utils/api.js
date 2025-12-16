// API Service Functions
// Gunakan functions ini untuk memanggil API dengan lebih mudah

import api from "./axios";

// Auth Services
export const authService = {
    login: async (username, password) => {
        const response = await api.post("/login", { username, password });
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post("/register", userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};

// Dashboard Services
export const dashboardService = {
    getDashboard: async () => {
        const response = await api.get("/dashboard");
        return response.data;
    },
};

// Prediction Services
export const predictionService = {
    createPrediction: async (data) => {
        const response = await api.post("/predict", data);
        return response.data;
    },

    getHistory: async (page = 1, perPage = 10) => {
        const response = await api.get(
            `/history?page=${page}&per_page=${perPage}`
        );
        return response.data;
    },
};

// Profile Services
export const profileService = {
    getProfile: async () => {
        const response = await api.get("/profile");
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.put("/profile", data);
        return response.data;
    },
};

export default {
    auth: authService,
    dashboard: dashboardService,
    prediction: predictionService,
    profile: profileService,
};
