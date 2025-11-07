import { mockBoard, mockUser } from '../../../shared/lib/mockData.js';

// Простое in-memory хранилище
let currentBoard = { ...mockBoard };
let currentUser = { ...mockUser };

export async function handleGetBoard(boardId) {
    console.log('Mock: get board', boardId);
    if (boardId === currentBoard.id) {
        return structuredClone(currentBoard);
    }
    return null;
}

export async function handleRenameBoard(boardId, boardName) {
    if (boardId === currentBoard.id) {
        currentBoard.title = boardName;
    }
}

export async function handleCloseBoard(boardId) {
    if (boardId === currentBoard.id) {
        // В моке просто удаляем
        currentBoard = null;
    }
}

// Для страницы /boards
export async function handleGetBoards() {
    return {
        activeBoards: currentBoard ? [structuredClone(currentBoard)] : [],
        archivedBoards: []
    };
}

export async function handleCreateBoard(boardName) {
    // Игнорируем в моке
}

export async function handleRestoreBoard(boardId) {}
export async function handleDeleteBoard(boardId) {}