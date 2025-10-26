import { apiClient } from '../../../shared/api/ApiClient.js';

export const AuthApi = {
    async login(data) {
        return apiClient.post('/auth/login', data);
    },
    async register(data) {
        return apiClient.post('/auth/register', data);
    },
    async logout() {
        return apiClient.post('/auth/logout');
    },
    async getCurrentUser() {
        return apiClient.get('/auth/me');
    }
};