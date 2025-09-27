import template from './Button.precompiled.js';

/**
 * Класс компонента - кнопки. Имеется обработка клика.
 * Использует precompiled Handlebars-шаблон. 
 */
export class Button {
    /**
     * @param {string} text - текст на кнопке
     * @param {() => void} onClick - обработчик нажатия
     * @param {boolean} [disabled=false] - статус кнопки (активная/отключенная)
     */
    constructor(text, onClick, disabled = false) {
        this.text = text;
        this.onClick = onClick;
        this.disabled = disabled;
    }

    /**
     * Рендер компонент на основе шаблона и добавляет реакцию на клик
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