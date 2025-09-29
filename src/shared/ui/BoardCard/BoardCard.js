import template from './BoardCard.precompiled.js';
import { Button } from '../Button/Button.js';
import { Modal } from '../Modal/Modal.js';

/**
 * Класс компонента - карточка доски. Имеет два состояния: активная и архивная.
 * Использует precompiled Handlebars-шаблон.
 */
export class BoardCard {
    /**
     * @param {Object} boardData - данные доски
     * @param {string} boardData.id - ID доски
     * @param {string} boardData.title - название доски
     * @param {string} boardData.image - URL изображения доски
     * @param {boolean} boardData.archived - статус архивации
     * @param {function} onRestore - обработчик восстановления доски
     * @param {function} onDelete - обработчик удаления доски
     */
    constructor(boardData, onRestore, onDelete) {
        this.boardData = boardData;
        this.onRestore = onRestore;
        this.onDelete = onDelete;
    }

    /**
     * Рендер компонента на основе шаблона
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            id: this.boardData.id,
            title: this.boardData.title,
            image: this.boardData.image,
            archived: this.boardData.archived
        });
        
        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;
        
        if (this.boardData.archived) {
            this.addActionButtons();
        }
        
        return this.element;
    }
    
    /**
     * Добавление кнопок действий для архивных досок
     */
    addActionButtons() {
        const actionsContainer = this.element.querySelector('#board-actions-container');
        
        // Кнопка "Восстановить"
        const restoreButton = new Button('Восстановить', () => {
            if (this.onRestore) {
                this.onRestore(this.boardData.id);
            }
        });
        const restoreButtonElement = restoreButton.render();
        restoreButtonElement.classList.add('board-card__button', 'board-card__button--restore');
        actionsContainer.appendChild(restoreButtonElement);
        
        // Кнопка "Удалить"
        const deleteButton = new Button('Удалить', () => {
            this.showDeleteConfirmation();
        });
        const deleteButtonElement = deleteButton.render();
        deleteButtonElement.classList.add('board-card__button', 'board-card__button--delete');
        actionsContainer.appendChild(deleteButtonElement);
    }
    
    /**
     * Показать модальное окно подтверждения удаления
     */
    showDeleteConfirmation() {
        const modal = new Modal({
            title: 'Удаление доски',
            text: `Вы точно хотите удалить доску "${this.boardData.title}"?`,
            buttons: [
                {
                    text: 'Нет',
                    onClick: () => modal.close(),
                    type: 'secondary'
                },
                {
                    text: 'Да',
                    onClick: () => {
                        if (this.onDelete) {
                            this.onDelete(this.boardData.id);
                        }
                        modal.close();
                    },
                    type: 'danger'
                }
            ],
            onClose: () => console.log('Модальное окно удаления закрыто')
        });
        
        modal.show();
    }
}