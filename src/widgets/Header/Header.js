import template from './Header.precompiled.js';
import { Button } from '../../shared/ui/Button/Button.js';
import './Header.css';

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
     * @param {() => void} onNavigate - обработчик навигации
     */
    constructor(userData, onLogout, onNavigate) {
        this.userData = userData;
        this.onLogout = onLogout;
        this.onNavigate = onNavigate;
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
        
        const logo = this.element.querySelector('.logo-img');
        const username = this.element.querySelector('.username');
        const avatar = this.element.querySelector('.avatar');

        if (logo) {
            logo.addEventListener('click', () => this.onNavigate('/'));
        }
        if (username) {
            username.addEventListener('click', () => this.onNavigate('/profile'));
        }
        if (avatar) {
            avatar.addEventListener('click', () => this.onNavigate('/profile'));
        }

        return this.element;
    }
}