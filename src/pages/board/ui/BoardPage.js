import { Header } from "../../../widgets/Header/Header.js";
import { ListCardsList } from "../../../widgets/ListCardsList/ListCardsList.js";
import { BoardHeader } from "../../../widgets/BoardHeader/BoardHeader.js";

/**
 * Класс страницы доски
 */
export class BoardPage {
    /**
     * @param {Object} boardData - данные доски
     * @param {Object} userData - данные пользователя
     * @param {Object} options - колбэки для обработки действий на странице
     */
    constructor(boardData, userData, options) {
        this.boardData = boardData;
        this.userData = userData;
        this.options = options;
    }

    render() {

        const pageContainer = document.createElement('div');
        pageContainer.className = 'board-page';

        const content = document.createElement('main');
        content.className = 'board-page__content';

        const header = new Header(this.userData, this.options.onLogout, this.options.onNavigate);
        
        const listsContainer = new ListCardsList(
            this.boardData,
            (boardId, newList) => this.options.onAddList(boardId, newList),
            (boardId, listId, title) => this.options.onRenameList(boardId, listId, title),
            (boardId, listId) => this.options.onDeleteList(boardId, listId),
            (boardId, listId, newTask) => this.options.onAddTask(boardId, listId, newTask),
            (boardId, listId, taskId, newTitle, isCompleted, action) =>
                this.options.onUpdateTask(boardId, listId, taskId, newTitle, isCompleted, action)
        );

        const boardHeader = new BoardHeader(
            this.boardData,
            () => listsContainer.addNewList(),
            (boardId, newName) => this.options.onRenameBoard(boardId, newName),
            (boardId) => this.options.onCloseBoard(boardId)
        );
        
        
        content.appendChild(listsContainer.render());
        pageContainer.appendChild(header.render());
        pageContainer.appendChild(boardHeader.render());
        pageContainer.appendChild(content);

        return pageContainer;
    }
}