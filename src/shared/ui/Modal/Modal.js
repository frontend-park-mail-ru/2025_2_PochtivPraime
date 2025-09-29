import template from './Modal.precompiled.js';
import { Button } from '../Button/Button.js';

/**
 * Класс компонента - модальное окно. Содержит заголовок, текст и кнопки действий.
 * Использует precompiled Handlebars-шаблон.
 */
export class Modal {
    /**
     * @param {Object} options - настройки модального окна
     * @param {string} options.title - заголовок модального окна
     * @param {string} options.text - текст модального окна
     * @param {Array} options.buttons - массив кнопок {text: string, onClick: function, type: string}
     * @param {function} options.onClose - обработчик закрытия модального окна
     */
    constructor(options) {
        this.title = options.title;
        this.text = options.text;
        this.buttons = options.buttons || [];
        this.onClose = options.onClose;
    }

    /**
     * Рендер компонента на основе шаблона
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            title: this.title,
            text: this.text
        });
        
        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;
        
        // Добавляем кнопки через компонент Button
        const buttonsContainer = this.element.querySelector('#modal-buttons-container');
        this.buttons.forEach(buttonConfig => {
            const button = new Button(
                buttonConfig.text, 
                buttonConfig.onClick, 
                buttonConfig.disabled
            );
            if (buttonConfig.type) {
                const buttonElement = button.render();
                buttonElement.classList.add(`button-${buttonConfig.type}`);
                buttonsContainer.appendChild(buttonElement);
            } else {
                buttonsContainer.appendChild(button.render());
            }
        });
        
        // Добавляем обработчик на кнопку закрытия
        const closeButton = this.element.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            this.close();
        });
        
        // Закрытие по клику на overlay
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.close();
            }
        });
        
        return this.element;
    }
    
    /**
     * Закрытие модального окна
     */
    close() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        if (this.onClose) {
            this.onClose();
        }
    }
    
    /**
     * Показать модальное окно (добавить в DOM)
     */
    show() {
        document.body.appendChild(this.render());
    }
}