import { Header } from '../../../widgets/Header/Header.js';
import { Button } from '../../../shared/ui/Button/Button.js';

/**
 * Класс страницы профиля
 */
export class ProfilePage {
    /**
     * @param {{ username: string, email: string, avatarUrl?: string }} userData - данные пользователя
     * @param {() => void} onEditProfile - переход на страницу редактирования профиля
     * @param {() => void} onLogout - выход из аккаунта
     * @param {(path: string) => void} onNavigate - навигация по страницам
     */
    constructor(userData, onEditProfile, onLogout, onNavigate) {
        this.userData = userData;
        this.onEditProfile = onEditProfile;
        this.onLogout = onLogout;
        this.onNavigate = onNavigate;
    }

    render() {
        document.body.className = 'profile-page';

        const pageContainer = document.createElement('div');
        pageContainer.className = 'profile-page-container';

        const header = new Header(this.userData, this.onLogout, this.onNavigate);
        pageContainer.appendChild(header.render());

        const content = document.createElement('main');
        content.className = 'profile-page__content';
        pageContainer.appendChild(content);

        const profileWrapper = document.createElement('div');
        profileWrapper.className = 'profile-wrapper';
        content.appendChild(profileWrapper);

        const avatar = document.createElement('img');
        avatar.className = 'profile-avatar';
        avatar.src = this.userData.avatarUrl || '/images/default-avatar.png';
        avatar.alt = 'Avatar';
        profileWrapper.appendChild(avatar);

        const username = document.createElement('h2');
        username.className = 'profile-username';
        username.textContent = this.userData.username || 'Имя пользователя';
        profileWrapper.appendChild(username);

        const email = document.createElement('p');
        email.className = 'profile-email';
        email.textContent = this.userData.email || 'example@mail.com';
        profileWrapper.appendChild(email);

        const editButton = new Button('Редактировать профиль', () => {
            this.onEditProfile();
        });
        profileWrapper.appendChild(editButton.render());

        return pageContainer;
    }
}