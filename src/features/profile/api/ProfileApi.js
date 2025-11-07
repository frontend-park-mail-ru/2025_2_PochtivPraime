import { apiClient } from '../../../shared/api/ApiClient.js';

export const ProfileApi = {
    async updateProfile(data) {

        return apiClient.put('/user/profile', {username: data.text, email: data.email});
    },

    async updatePassword({oldPassword: oldPassword, newPassword: newPassword}) {
        return apiClient.put('/user/password', {oldPassword: oldPassword, newPassword: newPassword});
    }
};