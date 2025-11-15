import template from './Header.precompiled.js';
import { Button } from '../../shared/ui/Button/Button.js';
import { Menu } from '../../shared/ui/Menu/Menu.js';
import { SupportWidget } from '../../features/support/ui/SupportWidget/SupportWidget.js'; 
import './Header.scss';

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
        logoutButtonElement.classList.add('btn--logout');
        const buttonContainer = this.element.querySelector('.header__actions');
        buttonContainer.appendChild(logoutButtonElement);
        this.addMenuButton();
        
        const logo = this.element.querySelector('.header__logo-img');
        const username = this.element.querySelector('.header__username');
        const avatar = this.element.querySelector('.header__avatar');

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

    addMenuButton() {
        const menuButton = new Button('', () => {});
        const menuButtonElement = menuButton.render();
        const buttonContainer = this.element.querySelector('.header__actions');

        const self = this;

        // Добавляем класс и иконку
        menuButtonElement.classList.add('header__menu-btn');
        menuButtonElement.innerHTML = `
            <img src="/images/menu-icon.svg" alt="Меню" class="header__menu-icon">
        `;

        // Добавляем кнопку в DOM
        buttonContainer.appendChild(menuButtonElement);

        // Обработчик клика — как в BoardHeader
        menuButtonElement.addEventListener('click', (e) => {
            e.stopPropagation();

            const menu = new Menu({
                title: 'Меню пользователя',
                actions: [
                    {
                        text: 'Обращение в техподдержку',
                        onClick: () => {
                            self.openSupportWidget();
                            menu.close()
                        }
                    },
                    {
                        text: 'Посмотреть мои обращения',
                        onClick: () => menu.close()
                    }
                ],
                onClose: () => {}
            });

            menu.show(); // ← должен добавить меню в DOM (обычно в body)

            const menuEl = menu.element;
            if (!menuEl) return;

            // Позиционируем как в BoardHeader: по правому краю кнопки
            const btnRect = menuButtonElement.getBoundingClientRect();
            const right = window.innerWidth - btnRect.right;
            const top = btnRect.bottom + 8; // небольшой отступ вниз

            menuEl.style.right = right + 'px';
            menuEl.style.top = top + 'px';
            menuEl.style.position = 'fixed';
            menuEl.style.zIndex = '1002';

            // Закрытие при клике вне меню
            const handleClickOutside = (event) => {
                if (!menuEl.contains(event.target) && event.target !== menuButtonElement) {
                    menu.close();
                    document.removeEventListener('click', handleClickOutside);
                }
            };

            document.addEventListener('click', handleClickOutside);
        });
    }

    openSupportWidget() {

        let existingWrapper = document.getElementById('support-wrapper');
        if (existingWrapper) {
            existingWrapper.remove();
        }

        const wrapper = document.createElement('div');
        wrapper.id = 'support-wrapper';
        wrapper.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 60%;
            height: 70%;
            max-width: 700px;
            transform: translate(-50%, -50%);
            border-radius: 12px;
            z-index: 1003;
        `;

        const iframe = document.createElement('iframe');
        iframe.id = 'support-iframe';
        iframe.src = '/support';
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 12px;
            padding: 5px;
        `;

        const closeBtn = document.createElement('btn');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 20px;
            line-height: 32px;
            padding: 0;
            z-index: 1005;
        `;
        closeBtn.onmouseover = () => {
            closeBtn.style.color = 'var(--warning-color)';
        };
        closeBtn.onmouseout = () => {
            closeBtn.style.color = 'var(--standart-text-color)';
        };

        wrapper.appendChild(iframe);
        wrapper.appendChild(closeBtn);
        document.body.appendChild(wrapper);

        const removeWidget = () => {
            if (wrapper) wrapper.remove();
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('message', closeHandler);
        };

        // --- закрытие кнопкой ---
        closeBtn.addEventListener('click', removeWidget);

        // --- закрытие кликом вне ---
        const handleClickOutside = (event) => {
            if (!wrapper.contains(event.target)) {
                removeWidget();
            }
        };

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        // --- закрытие из iframe ---
        const closeHandler = (e) => {
            if (e.data?.type === 'SUPPORT_CLOSE') {
                removeWidget();
            }
        };
        window.addEventListener('message', closeHandler);
    }
}