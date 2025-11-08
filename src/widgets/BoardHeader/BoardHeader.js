import template from './BoardHeader.precompiled.js';
import './BoardHeader.scss';
import { Menu } from '../../shared/ui/Menu/Menu.js';
import { Modal } from '../../shared/ui/Modal/Modal.js';
import { Input } from '../../shared/ui/Input/Input.js';

/**
 * Класс компонента — заголовок доски.
 * Использует precompiled Handlebars-шаблон.
 */
export class BoardHeader {
    /**
     * @param {Object} boardData - данные доски
     * @param {string} boardData.id - ID доски
     * @param {string} boardData.title - название доски
     * @param {function} onAddBoard - обработчик добавления новой доски
     * @param {function} onRenameBoard - обработчик переименования доски
     * @param {function} onCloseBoard - обработчик закрытия доски
     */
    constructor(boardData, onAddList, onRenameBoard, onCloseBoard) {
        this.boardData = boardData;
        this.onAddList = onAddList;
        this.onRenameBoard = onRenameBoard;
        this.onCloseBoard = onCloseBoard;

        // Локальное состояние
        this.title = boardData.title || 'Без названия';
        this.id = boardData.id;
    }

    render() {
        const html = template({
            id: this.id,
            title: this.title
        });

        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;

        this.bindEvents();

        return this.element;
    }

    bindEvents() {
        const menuBtn = this.element.querySelector('.board-header__menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openMenu();
            });
        }
    }

    openMenu() {
        const menuBtn = this.element.querySelector('.board-header__menu-btn');

        const menu = new Menu({
            title: 'Меню доски',
            actions: [
                {
                    text: 'Добавить список',
                    onClick: () => {
                        menu.close();
                        if (this.onAddList) {
                            this.onAddList(this.id);
                        }
                    }
                },
                {
                    text: 'Изменить название',
                    onClick: () => {
                        menu.close();
                        this.showRenameModal();
                    }
                },
                {
                    text: 'Закрыть доску',
                    onClick: () => {
                        menu.close();
                        this.showCloseConfirmation();
                    },
                    type: 'danger'
                }
            ],
            onClose: () => {}
        });

        menu.show();

        const menuEl = menu.element;
        if (!menuEl) return;

        const btnRect = menuBtn.getBoundingClientRect();
        const right = window.innerWidth - btnRect.right;
        const top = btnRect.top;
        menuEl.style.right = right + 'px'
        menuEl.style.top = top + 'px';
        menuEl.style.position = 'fixed';
        menuEl.style.zIndex = '1002';

        // Обработчик кликов вне меню
        const handleClickOutside = (event) => {
            if (!menuEl.contains(event.target) && !menuBtn.contains(event.target)) {
                menu.close();
                document.removeEventListener('click', handleClickOutside);
            }
        };

        document.addEventListener('click', handleClickOutside);
    }

    showRenameModal() {
        this.boardNameInput = new Input('text', 'Новое название...', this.title);

        const modal = new Modal({
            title: 'Изменить название доски',
            text: 'Введите новое название:',
            buttons: [
                {
                    text: 'Отмена',
                    onClick: () => modal.close()
                },
                {
                    text: 'Сохранить',
                    onClick: () => this.handleRenameConfirm(modal),
                    type: 'success'
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
            const inputEl = this.boardNameInput.element;
            if (inputEl) {
                inputEl.focus();
                inputEl.select();

                inputEl.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const saveBtn = modalElement.querySelector('.button-agreement');
                        if (saveBtn) saveBtn.click();
                    }
                });
            }
        }, 100);
    }

    handleRenameConfirm(modal) {
        if (!this.boardNameInput) return;

        const isValid = this.boardNameInput.validate();
        const newName = this.boardNameInput.getValue().trim();

        if (isValid && newName && newName !== this.title) {
            this.title = newName;
            if (this.onRenameBoard) {
                this.onRenameBoard(this.id, newName);
            }
            this.rerender();
        }

        modal.close();
    }

    showCloseConfirmation() {
        const modal = new Modal({
            title: 'Закрытие доски',
            text: `Вы точно хотите закрыть доску "${this.title}"?`,
            buttons: [
                {
                    text: 'Нет',
                    onClick: () => modal.close(),
                    type: 'danger'
                },
                {
                    text: 'Да',
                    onClick: () => {
                        if (this.onCloseBoard) {
                            this.onCloseBoard(this.id);
                        }
                        modal.close();
                    },
                    type: 'success'
                }
            ],
            onClose: () => {}
        });

        modal.show();
    }

    rerender() {
        const oldElement = this.element;
        const newElement = this.render();

        if (oldElement && oldElement.parentNode) {
            oldElement.parentNode.replaceChild(newElement, oldElement);
        }
    }
}