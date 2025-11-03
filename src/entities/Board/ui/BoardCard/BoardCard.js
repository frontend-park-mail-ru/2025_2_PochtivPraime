import template from './BoardCard.precompiled.js';
import { Button } from '../../../../shared/ui/Button/Button.js';
import { Modal } from '../../../../shared/ui/Modal/Modal.js';
import { Menu } from '../../../../shared/ui/Menu/Menu.js';

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
    constructor(boardData, onOpen, onRestore, onDelete) {
        this.boardData = boardData;
        this.onOpen = onOpen;
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
            image: this.boardData.image || "/images/default-board-bg.jpg",
            archived: this.boardData.archived
        });
        
        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;

        this.element.addEventListener('click', () => {
            if (this.onOpen) {
                this.onOpen(this.boardData.id);
            }
        });
        
        if (this.boardData.archived) {
            this.addMenuButton();
        }
        
        return this.element;
    }

    /**
     * Добавление кнопок действий для архивных досок
     */
    addMenuButton() {
        const menuButton = this.element.querySelector('.board-card__menu-button');
        
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // не мешать другим обработчикам
            
            // получаем позицию карточки
            const rect = this.element.getBoundingClientRect();
            
            // Создаём меню
            const menu = new Menu({
                title: 'Закрытая карточка',
                actions: [
                    {
                        text: 'Восстановить',
                        onClick: () => {
                            menu.close();
                            if (this.onRestore) {
                                this.onRestore(this.boardData.id);
                            }
                        }
                    },
                    {
                        text: 'Удалить',
                        onClick: () => {
                            menu.close();
                            this.showDeleteConfirmation();
                        },
                        type: 'danger'
                    }
                ],
                onClose: () => {}
            });

            menu.show();

            // помещаем его справа от карточки
            const menuEl = menu.element;
            const menuRect = menuEl.getBoundingClientRect();

            // справа от карточки + небольшой отступ
            const left = rect.right + 8;
            const top = rect.top;

            // если меню вылезает за правый край — показываем слева
            if (left + menuRect.width > window.innerWidth) {
                menuEl.style.left = (rect.left - menuRect.width - 8) + 'px';
            } else {
                menuEl.style.left = left + 'px';
            }

            menuEl.style.top = top + 'px';
            menuEl.style.position = 'fixed';
            menuEl.style.zIndex = '1002'; // выше оверлея модалки (1001)

            //закрытие меню при клике вне
            const handleClickOutside = (event) => {
                if (!menuEl.contains(event.target) && event.target !== menuButton) {
                    menu.close();
                    document.removeEventListener('click', handleClickOutside);
                }
            };

            // добавляем обработчик на document
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 0);
        });
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
                    type: 'danger'
                },
                {
                    text: 'Да',
                    onClick: () => {
                        if (this.onDelete) {
                            this.onDelete(this.boardData.id);
                        }
                        modal.close();
                    },
                    type: 'agreement'
                }
            ],
            onClose: () => {}
        });
        
        modal.show();
    }
}