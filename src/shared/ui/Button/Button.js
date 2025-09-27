import template from './Button.precompiled.js';

/**
 * Класс компонента - кнопки. Имеется обработка клика и рендеринг через шаблон.
 */
export class Button {
    /**
     * @param {string} text - Текст на кнопке
     * @param {() => void} onClick - Обработчик нажатия
     * @param {boolean} [disabled=false] - Флаг статуса кнопки (активная/отключенная)
     */
    constructor(text, onClick, disabled = false) {
        this.text = text;
        this.onClick = onClick;
        this.disabled = disabled;
    }
    /**
     * Рендер DOM-элемента кнопки. Обработчик клика.
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            text: this.text,
            disabled: this.disabled
        });
        
        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;
        
        this.element.addEventListener('click', () => {
            if (!this.disabled && this.onClick) {
                this.onClick();
            }
        });
        
        return this.element;
    }
}