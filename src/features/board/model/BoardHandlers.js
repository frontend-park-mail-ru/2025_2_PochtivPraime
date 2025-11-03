import { BoardApi } from '../api/BoardApi.js';

/**
 * Обработка переименования доски
 * @param {string} boardId - ID доски
 * @param {string} boardName - новое название доски
 */
export async function handleRenameBoard(boardId, boardName) {
    try {
        await BoardApi.renameBoard(boardId, boardName);
    } catch (error) {
        console.error('Renaming board error:', error);
        return error.message || 'Ошибка при изменения названия доски';
    }
}

/**
 * Обработка удаления доски
 * @param {string} boardId - ID доски
 */
export async function handleCloseBoard(boardId) {
    try {
        await BoardApi.closeBoard(boardId);
    } catch (error) {
        console.error('Closing board error:', error);
    }
}

/**
 * Обработка получения доски
 * @param {string} boardId - ID доски
 * @returns {object|null} - данные доски или null в случае ошибки
 */
export async function handleGetBoard(boardId) {
    try {
        return await BoardApi.getBoard(boardId);
    } catch (error) {
        console.error('Get board error:', error);
        return null;
    }
}