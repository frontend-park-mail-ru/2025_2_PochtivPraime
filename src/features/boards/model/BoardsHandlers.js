import { BoardsApi } from '../api/BoardsApi.js';

/**
 * Обработка создания доски
 */
export async function handleCreateBoard(boardName) {
    try {
        await BoardsApi.createBoard(boardName);
    } catch (error) {
        console.error('Create board error:', error);
        return error.message || 'Ошибка при создании доски';
    }
}

/**
 * Обработка удаления доски
 */
export async function handleDeleteBoard(boardId) {
    try {
        await BoardsApi.deleteBoard(boardId);
    } catch (error) {
        console.error('Delete board error:', error);
    }
}

/**
 * Обработка восстановления доски
 */
export async function handleRestoreBoard(boardId) {
    try {
        await BoardsApi.restoreBoard(boardId);
    } catch (error) {
        console.error('Restore board error:', error);
    }
}

/**
 * Обработка получения досок
 */
export async function handleGetBoards() {
    try {
        return await BoardsApi.getBoards();
    } catch (error) {
        console.error('Get board error:', error);
        return null;
    }
}