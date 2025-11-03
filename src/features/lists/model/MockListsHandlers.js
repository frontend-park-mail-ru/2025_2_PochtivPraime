import { mockBoard } from '../../../shared/lib/mockData.js';

let currentBoard = structuredClone(mockBoard);

export async function handleCreateList(boardId, listName) {
    if (boardId === currentBoard.id) {
        const newList = {
            id: `list-${Date.now()}`,
            title: listName,
            tasks: []
        };
        currentBoard.lists.push(newList);
    }
    return structuredClone(currentBoard.lists.find(l => l.title === listName) || null);
}

export async function handleDeleteList(boardId, listId) {
    if (boardId === currentBoard.id) {
        currentBoard.lists = currentBoard.lists.filter(l => l.id !== listId);
    }
}

export async function handleRenameList(boardId, listId, listName) {
    if (boardId === currentBoard.id) {
        const list = currentBoard.lists.find(l => l.id === listId);
        if (list) list.title = listName;
    }
}

export async function handleGetLists(boardId) {
    if (boardId === currentBoard.id) {
        return structuredClone(currentBoard.lists);
    }
    return [];
}