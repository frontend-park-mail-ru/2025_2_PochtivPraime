import template from './Input.precompiled.js';

/**
 * Класс компонента - поля ввода. Имеет валидацию для разных типов и рендеринг на основе шаблона.
 *
 * Поддерживаемые типы:
 *  - text (по умолчанию)
 *  - email
 *  - password
 *  - login
 */
export class Input {
    /**
     * @param {string} [type='text'] - Тип поля
     * @param {string} [placeholder=''] - Плейсхолдер
     * @param {string} [value=''] - Начальное значение
     */
    constructor(type = 'text', placeholder = '', value = '') {
        this.type = type;
        this.placeholder = placeholder;
        this.value = value;
        this.error = '';
    }
    
    /**
     * Проверяет введённое значение на корректность в зависимости от типа.
     * @returns {boolean} true, если значение валидно
     */
    validate() {
        this.error = '';
        
        if (!this.value.trim()) {
            this.error = 'Поле не может быть пустым';
            return false;
        }
        
        if (this.type === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
                this.error = 'Некорректный email';
                return false;
            }
        }
        
        if (this.type === 'password') {
            if (this.value.length < 6) {
                this.error = 'Пароль должен быть не менее 6 символов';
                return false;
            }
        }
        
        if (this.type === 'login') {
            if (this.value.length < 3) {
                this.error = 'Имя пользователя должно быть не менее 3 символов';
                return false;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(this.value)) {
                this.error = 'Имя пользователя может содержать только буквы, цифры и знак _';
                return false;
            }
        }
        
        return true;
    }
    
    /** @returns {string} Текущее значение поля */
    getValue() {
        return this.value;
    }
    
    /**
     * Рендер DOM-элемента поля ввода.
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            type: this.type,
            placeholder: this.placeholder,
            value: this.value,
            error: this.error
        });
        
        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;
        
        this.element.addEventListener('input', (e) => {
            this.value = e.target.value;
        });
        
        return this.element;
    }
}