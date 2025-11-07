import { ListsApi } from '../api/ListsApi.js';

/**
 * Обработка создания списка
 * @param {string} boardId - ID доски
 * @param {string} listName - название списка
 * @returns {string|undefined} - Сообщение об ошибке или undefined при успешном создании списка
 */
export async function handleCreateList(boardId, listName) {
    try {
        const createdList = await ListsApi.createList(boardId, listName);
        return createdList;
    } catch (error) {
        console.error('Create task error:', error);
        return null;
    }
}

/**
 * Обработка удаления списка
 * @param {string} boardId - ID доски
 * @param {string} listId - ID списка
 */
export async function handleDeleteList(boardId, listId) {
    try {
        await ListsApi.deleteList(boardId, listId);
    } catch (error) {
        console.error('Delete list error:', error);
    }
}

/**
 * Обработка изменение имени списка
 * @param {string} boardId - ID доски
 * @param {string} listId - ID списка
 * @param {string} listName - новое название списка
 */
export async function handleRenameList(boardId, listId, listName) {
    try {
        await ListsApi.renameList(boardId, listId, listName);
    } catch (error) {
        console.error('Update list error:', error);
    }
}

/**
 * Обработка получения списков
 * @param {string} boardId - ID доски
 * @returns {array|null} - массив списков или null в случае ошибки
 */
export async function handleGetLists(boardId) {
    try {
        return await ListsApi.getLists(boardId);
    } catch (error) {
        console.error('Get lists error:', error);
        return null;
    }
}

/**
 * Обработка получения списка
 * @param {string} boardId - ID доски
 * @param {string} listId - ID списка
 * @returns {object|null} - данные списка или null в случае ошибки
 */
export async function handleGetList(boardId, listId) {
    try {
        return await ListsApi.getList(boardId, listId);
    } catch (error) {
        console.error('Get list error:', error);
        return null;
    }
}