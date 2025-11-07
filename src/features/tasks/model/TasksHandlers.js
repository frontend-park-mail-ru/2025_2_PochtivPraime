import { TasksApi } from '../api/TasksApi.js';

/**
 * Обработка создания задачи
 * @param {string} boardId - Идентификатор доски
 * @param {string} listId - Идентификатор списка
 * @param {string} taskName - Название задачи
 * @returns {string|undefined} - Сообщение об ошибке или undefined при успешном создании задачи
 */
export async function handleCreateTask(boardId, listId, content) {
    try {
        const createdTask = await TasksApi.createTask(boardId, listId, {content: content});
        console.log(createdTask)
        return createdTask;
    } catch (error) {
        console.error('Create task error:', error);
        return null;
    }
}

/**
 * Обработка удаления задачи
 * @param {string} boardId - ID доски
 * @param {string} listId - ID списка
 * @param {string} taskId - ID задачи
 */
export async function handleDeleteTask(boardId, listId, taskId) {
    try {
        await TasksApi.deleteTask(boardId, listId, taskId);
    } catch (error) {
        console.error('Delete task error:', error);
    }
}

/**
 * Обработка обновления задачи
 * @param {string} boardId - ID доски
 * @param {string} listId - ID списка
 * @param {string} taskId - ID задачи
 * @param {object} data - данные для обновления задачи
 */
export async function handleUpdateTask(boardId, listId, taskId, data) {
    console.log(data);
    try {
        await TasksApi.updateTask(boardId, listId, taskId, data);
    } catch (error) {
        console.error('Update task error:', error);
    }
}

/**
 * Обработка получения задач
 * @param {string} boardId - ID доски
 * @param {string} listId - Id списка
 * @returns {Array|null} - массив задач или null в случае ошибки
 */
export async function handleGetTasks(boardId, listId) {
    try {
        return await TasksApi.getTasks(boardId, listId);
    } catch (error) {
        console.error('Get tasks error:', error);
        return null;
    }
}

/**
 * Обработка получения задачи
 */
export async function handleGetTask(boardId, listId, taskId) {
    try {
        return await TasksApi.getTask(boardId, listId, taskId);
    } catch (error) {
        console.error('Get task error:', error);
        return null;
    }
}