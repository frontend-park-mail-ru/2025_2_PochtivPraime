import { apiClient } from '../../../shared/api/ApiClient.js';

export const ListsApi = {
    async getLists(boardId) {
        return apiClient.get(`/board/${boardId}/lists`);
    },

    async getList(boardId, listId) {
        return apiClient.get(`/board/${boardId}/lists/${listId}`);
    },

    async createList(boardId, title) {
        return apiClient.post(`/board/${boardId}/lists`, { title });
    },

    async renameList(boardId, listId, title) {
        return apiClient.put(`/board/${boardId}/lists/${listId}`, { title });
    },

    async deleteList(boardId, listId) {
        return apiClient.delete(`/board/${boardId}/lists/${listId}`);
    }
};