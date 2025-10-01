import { Header } from '../../../shared/ui/Header/Header.js';
import { BoardsList } from '../../../widgets/BoardsList/BoardsList.js';
import { Modal } from '../../../shared/ui/Modal/Modal.js';
import { Input } from '../../../shared/ui/Input/Input.js';

export class BoardsListPage {
    constructor(userData, activeBoards, archivedBoards, onLogout, onRestoreBoard, onDeleteBoard, onCreateBoard) {
        this.userData = userData;
        this.activeBoards = activeBoards;
        this.archivedBoards = archivedBoards;
        this.onLogout = onLogout;
        this.onRestoreBoard = onRestoreBoard;
        this.onDeleteBoard = onDeleteBoard;
        this.onCreateBoard = onCreateBoard;
        this.boardNameInput = null;
    }

    render() {
        document.body.className = 'boards-list-page';
        const container = document.createElement('div');
        container.className = 'boards-list-page';
        
        const header = new Header(this.userData, this.onLogout);
        container.appendChild(header.render());
        const content = document.createElement('main');
        content.className = 'boards-list-page__content';
        
        const activeBoardsList = new BoardsList({
            title: 'Мои доски',
            boards: this.activeBoards,
            isArchived: false,
            onHeaderButtonClick: () => this.showCreateBoardModal(),
            boardsPerPage: 10
        });
        content.appendChild(activeBoardsList.render());
        
        if (this.archivedBoards.length > 0) {
            const archivedBoardsList = new BoardsList({
                title: 'Закрытые доски',
                boards: this.archivedBoards,
                isArchived: true,
                onRestoreBoard: this.onRestoreBoard,
                onDeleteBoard: this.onDeleteBoard,
                boardsPerPage: 8
            });
            content.appendChild(archivedBoardsList.render());
        }
        
        container.appendChild(content);
        return container;
    }

    /**
     * Показывает модальное окно для создания доски
     */
    showCreateBoardModal() {
        this.boardNameInput = new Input('text', 'Название доски', '');
        
        // Создаем модальное окно
        const modal = new Modal({
            title: 'Создание новой доски',
            text: 'Введите название для новой доски:',
            buttons: [
                {
                    text: 'Отмена',
                    onClick: () => modal.close(),
                    type: 'secondary'
                },
                {
                    text: 'Создать',
                    onClick: () => this.handleCreateBoardConfirm(modal),
                    type: 'primary'
                }
            ],
            onClose: () => {
                this.boardNameInput = null;
            }
        });
        
        const modalElement = modal.render();
        const modalBody = modalElement.querySelector('.modal-body');
        
        modalBody.innerHTML = '';
        modalBody.appendChild(this.boardNameInput.render());
        
        document.body.appendChild(modalElement);
        
        setTimeout(() => {
            const inputElement = this.boardNameInput.element;
            if (inputElement) {
                inputElement.focus();
            }
        }, 100);
    }

    /**
     * Обработчик подтверждения создания доски
     */
    async handleCreateBoardConfirm(modal) {
        if (!this.boardNameInput) return;
        
        const isValid = this.boardNameInput.validate();
        const boardName = this.boardNameInput.getValue().trim();
        
        if (isValid && boardName) {
            const err = await this.onCreateBoard(boardName);
            if (!err){
                modal.close();
            } else {
                this.boardNameInput.setError(err)
            }
            
        }
    }
}