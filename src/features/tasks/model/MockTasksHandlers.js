import { mockBoard } from '../../../shared/lib/mockData.js';

let currentBoard = structuredClone(mockBoard);

function findTask(listId, taskId) {
    const list = currentBoard.lists.find(l => l.id === listId);
    return list ? list.tasks.find(t => t.id === taskId) : null;
}

function findList(listId) {
    return currentBoard.lists.find(l => l.id === listId);
}

export async function handleCreateTask(boardId, listId, taskName) {
    if (boardId === currentBoard.id) {
        const list = findList(listId);
        if (list) {
            list.tasks.push({
                id: `task-${Date.now()}`,
                title: taskName,
                isCompleted: false
            });
        }
        return structuredClone(list ? list.tasks[list.tasks.length - 1] : null);
    }
}

export async function handleDeleteTask(boardId, listId, taskId) {
    if (boardId === currentBoard.id) {
        const list = findList(listId);
        if (list) {
            list.tasks = list.tasks.filter(t => t.id !== taskId);
        }
    }
}

export async function handleUpdateTask(boardId, listId, taskId, data) {
    if (boardId === currentBoard.id) {
        const task = findTask(listId, taskId);
        if (task) {
            Object.assign(task, data);
        }
    }
}

export async function handleGetTasks(boardId, listId) {
    if (boardId === currentBoard.id) {
        const list = findList(listId);
        return list ? structuredClone(list.tasks) : [];
    }
    return [];
}

export async function handleGetTask(boardData, taskId) {
    for (const list of boardData.lists) {
        const task = list.tasks.find(t => t.id === taskId);
        if (task) {
            return structuredClone(task);
        }
    }
    return null;
}