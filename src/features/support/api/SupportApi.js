import { apiClient } from '../../../shared/api/ApiClient.js';

export const SupportApi = {
    async createForm(data) {
        return apiClient.post('/forms', data);
    },
    async getMyForms() {
        return apiClient.get('/forms');
    },
    async getFormById(formId) {
        return apiClient.get(`/forms/${formId}`);
    },
    async deleteForm(formId) {
        return apiClient.delete(`/forms/${formId}`);
    },
    async getAllForms() {
        return apiClient.get('/forms/statistic');
    }
};