import { apiClient } from '../../../shared/api/ApiClient.js';

export const BoardsApi = {
    async getBoards() {
        return apiClient.get('/boards');
    },

    async createBoard(title) {
        return apiClient.post('/boards', { title });
    },

    async deleteBoard(boardId) {
        return apiClient.delete(`/boards/${boardId}`);
    },

    async restoreBoard(boardId) {
        return apiClient.post(`/boards/${boardId}/restore`);
    }
};