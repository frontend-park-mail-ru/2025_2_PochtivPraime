import { apiClient } from '../../../shared/api/ApiClient.js';

export const TasksApi = {
    async getTasks(boardId, listId) {
        return apiClient.get(`/board/${boardId}/list/${listId}/tasks`);
    },

    async getTask(boardId, listId, taskId) {
        return apiClient.get(`/board/${boardId}/list/${listId}/task/${taskId}`);
    },

    async createTask(boardId, listId, content) {
        return apiClient.post(`/board/${boardId}/list/${listId}/tasks`, content);
    },

    async updateTask(boardId, listId, taskId, data) {
        return apiClient.put(`/board/${boardId}/list/${listId}/task/${taskId}`, data);
    },

    async deleteTask(boardId, listId, taskId) {
        return apiClient.delete(`/board/${boardId}/list/${listId}/task/${taskId}`);
    }
};