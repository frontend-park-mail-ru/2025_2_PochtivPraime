import template from './Header.precompiled.js';
import { Button } from '../../shared/ui/Button/Button.js';

/**
 * Класс компонента - хедер. Содержит информацию о пользователе и кнопку выхода.
 * Использует precompiled Handlebars-шаблон.
 */
export class Header {
    /**
     * @param {Object} userData - данные пользователя
     * @param {string} userData.username - имя пользователя
     * @param {string} userData.avatar - URL аватарки
     * @param {() => void} onLogout - обработчик выхода
     */
    constructor(userData, onLogout) {
        this.userData = userData;
        this.onLogout = onLogout;
    }

    /**
     * Рендер компонента на основе шаблона
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            username: this.userData.username,
            avatar: this.userData.avatar || "/images/default-avatar.png"
        });
        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;
        
        const logoutButton = new Button('', this.onLogout);
        const logoutButtonElement = logoutButton.render();
        logoutButtonElement.classList.add('logout-button');
        const buttonContainer = this.element.querySelector('#logout-button-container');
        buttonContainer.appendChild(logoutButtonElement);
        
        return this.element;
    }
}