import { apiClient } from '../../../shared/api/ApiClient.js';

export const BoardApi = {
  async getBoard(boardId) {
    return apiClient.get(`/boards/${boardId}`);
  },
  async renameBoard(boardId, title) {
    return apiClient.put(`/boards/${boardId}`, { title });
  },
  async closeBoard(boardId) {
    return apiClient.put(`/boards/${boardId}/close`);
  },
};