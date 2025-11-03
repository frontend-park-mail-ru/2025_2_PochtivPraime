import template from './Menu.precompiled.js';
import { Button } from '../Button/Button.js';

/**
 * Класс компонента - всплывающее меню с действиями.
 * Использует precompiled Handlebars-шаблон. 
 */
export class Menu {
    static activeMenu = null; // текущее активное меню
    /**
     * @param {Object} options - настройки меню
     * @param {string} options.title - заголовок меню
     * @param {Array} options.actions - массив действий: { text: string, onClick: function, disabled?: boolean, type?: 'danger' | 'agreement' | string }
     * @param {function} [options.onClose] - обработчик закрытия
     */
    constructor(options) {
        this.title = options.title;
        this.actions = options.actions || [];
        this.onClose = options.onClose;
    }

    /**
     * Показать меню
     */
    show() {
        // если другое меню уже открыто — закрываем его
        const Active = this.constructor;
        if (Active.activeMenu && Active.activeMenu !== this) {
            Active.activeMenu.close();
        }

        // если меню уже есть — закрываем
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        const rendered = this.render();

        // вставляем в body
        if (document.body) {
            document.body.appendChild(rendered);
            Active.activeMenu = this;
        } else {
            console.error('Menu.show() недоступен');
        }
    }

    /**
     * Рендер компонента
     * @returns {HTMLElement}
     */
    render() {
        const html = template({ title: this.title });

        const div = document.createElement('div');
        div.innerHTML = html.trim(); // без текстовых узлов вокруг элемента
        this.element = div.firstElementChild;

        if (!this.element) {
            return document.createElement('div');
        }

        // убираем отдельный wrapper — используем элемент из шаблона напрямую
        const actionsContainer = this.element.querySelector('#menu-actions-container');
        if (!actionsContainer) {
            return this.element;
        }
        // кнопки
        this.actions.forEach(action => {
            const button = new Button(action.text, action.onClick, action.disabled);
            const buttonEl = button.render();
            if (action.type) buttonEl.classList.add(`button-${action.type}`);
            actionsContainer.appendChild(buttonEl);
        });
        
        // обработчик закрытия
        const closeButton = this.element.querySelector('.menu-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }

        return this.element;
    }

    /**
     * закрыть меню
     */
    close() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        if (this.constructor.activeMenu === this) {
            this.constructor.activeMenu = null;
        }
        if (this.onClose) {
            this.onClose();
        }
    }
}