import template from './BoardsList.precompiled.js';
import { Button } from '../../shared/ui/Button/Button.js';
import { BoardCard } from '../../entities/Board/ui/BoardCard/BoardCard.js';
import { Pagination } from '../../shared/ui/Pagination/Pagination.js';
/**
 * Класс компонента - список досок с пагинацией.
 * Использует precompiled Handlebars-шаблон.
 */
export class BoardsList {
    /**
     * @param {Object} options - настройки списка досок
     * @param {string} options.title - заголовок списка
     * @param {Array} options.boards - массив досок
     * @param {boolean} options.isArchived - является ли список архивных досок
     * @param {function} options.onHeaderButtonClick - обработчик кнопки в заголовке
     * @param {function} options.onRestoreBoard - обработчик восстановления доски
     * @param {function} options.onDeleteBoard - обработчик удаления доски
     * @param {number} options.boardsPerPage - количество досок на странице (по умолчанию 4)
     */
    constructor(options) {
        this.title = options.title;
        this.boards = options.boards || [];
        this.isArchived = options.isArchived || false;
        this.onHeaderButtonClick = options.onHeaderButtonClick;
        this.onRestoreBoard = options.onRestoreBoard;
        this.onDeleteBoard = options.onDeleteBoard;
        this.boardsPerPage = options.boardsPerPage || 5;
        
        // Состояние для архивных досок
        this.isExpanded = !this.isArchived; // Активные всегда развернуты
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.boards.length / this.boardsPerPage);
    }

    /**
     * Рендер компонента на основе шаблона
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            title: this.title,
            isArchived: this.isArchived,
            isExpanded: this.isExpanded,
            showPagination: this.totalPages > 1,
            currentPage: this.currentPage,
            totalPages: this.totalPages
        });
        
        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;
        
        // Добавляем кнопку в заголовок
        this.addHeaderButton();
        
        // Добавляем карточки досок
        this.renderBoards();
        
        // Добавляем обработчики пагинации
        if (this.totalPages > 1) {
            this.renderPagination();
        }
        
        return this.element;
    }
    
    /**
     * Добавление кнопки в заголовок
     */
    addHeaderButton() {
        const headerActionsContainer = this.element.querySelector('#header-actions-container');
        
        let buttonText, buttonType;
        
        if (this.isArchived) {
            buttonText = this.isExpanded ? 'Свернуть' : 'Развернуть';
            buttonType = 'secondary';
        } else {
            buttonText = 'Создать +';
            buttonType = 'primary';
        }
        
        const headerButton = new Button(buttonText, () => {
            if (this.isArchived) {
                this.toggleExpanded();
            } else {
                if (this.onHeaderButtonClick) {
                    this.onHeaderButtonClick();
                }
            }
        });
        
        const buttonElement = headerButton.render();
        buttonElement.classList.add(`button-${buttonType}`);
        headerActionsContainer.appendChild(buttonElement);
    }
    
    /**
     * Рендер карточек досок
     */
    renderBoards() {
        const boardsGridContainer = this.element.querySelector('#boards-grid-container');
        boardsGridContainer.innerHTML = '';
        
        const startIndex = (this.currentPage - 1) * this.boardsPerPage;
        const endIndex = startIndex + this.boardsPerPage;
        const boardsToShow = this.boards.slice(startIndex, endIndex);
        
        boardsToShow.forEach(board => {
            const boardCard = new BoardCard(
                board,
                this.onRestoreBoard,
                this.onDeleteBoard
            );
            boardsGridContainer.appendChild(boardCard.render());
        });
    }
    
    /**
     * Переключение состояния развернуто/свернуто для архивных досок
     */
    toggleExpanded() {
        
        this.isExpanded = !this.isExpanded;
        
        const content = this.element.querySelector('.boards-list__content');
        const headerButton = this.element.querySelector('.boards-list__header-actions button');
        
        if (this.isExpanded) {
            content.classList.remove('boards-list__content--hidden');
            headerButton.textContent = 'Свернуть';
            this.renderBoards();
            if (this.totalPages > 1) {
                this.renderPagination();
            }
        } else {
            content.classList.add('boards-list__content--hidden');
            headerButton.textContent = 'Развернуть';
        }
        
    }
        
    /**
     * Рендер пагинации через компонент Pagination
     */
    renderPagination() {
        const paginationContainer = this.element.querySelector('#pagination-container');
        if (!paginationContainer) return;

        // Удаляем старую пагинацию (если есть)
        paginationContainer.innerHTML = '';

        const pagination = new Pagination({
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            onPrev: () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderBoards();
                    this.renderPagination(); // обновляем пагинацию
                }
            },
            onNext: () => {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.renderBoards();
                    this.renderPagination(); // обновляем пагинацию
                }
            }
        });

        paginationContainer.appendChild(pagination.render());
    }
    
    /**
     * Обновление списка досок
     * @param {Array} newBoards - новый массив досок
     */
    updateBoards(newBoards) {
        this.boards = newBoards;
        this.totalPages = Math.ceil(this.boards.length / this.boardsPerPage);
        this.currentPage = 1;
        
        if (this.isExpanded || !this.isArchived) {
            this.renderBoards();
            if (this.isExpanded || !this.isArchived) {
                if (this.totalPages > 1) {
                    this.renderPagination();
                }
            }
        }
    }
}