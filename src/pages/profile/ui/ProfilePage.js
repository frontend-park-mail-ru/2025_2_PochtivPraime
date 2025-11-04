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
        const pageContainer = document.createElement('div');
        pageContainer.className = 'profile-page';

        const content = document.createElement('main');
        content.className = 'profile-page__content';

        const profileWrapper = document.createElement('div');
        profileWrapper.className = 'profile-page__wrapper';

        const header = new Header(this.userData, this.onLogout, this.onNavigate);

        const avatar = document.createElement('img');
        avatar.className = 'profile-page__avatar';
        avatar.src = this.userData.avatarUrl || '/images/default-avatar.png';
        avatar.alt = 'Avatar';
        
        const username = document.createElement('h2');
        username.className = 'profile-page__username';
        username.textContent = this.userData.username || 'Имя пользователя';
        
        const email = document.createElement('p');
        email.className = 'profile-page__email';
        email.textContent = this.userData.email || 'example@mail.com';
        
        const editButton = new Button('Редактировать профиль', () => {
            this.onEditProfile();
        });
        

        profileWrapper.appendChild(avatar);
        profileWrapper.appendChild(username);
        profileWrapper.appendChild(email);
        profileWrapper.appendChild(editButton.render());

        content.appendChild(profileWrapper);
        pageContainer.appendChild(header.render());
        pageContainer.appendChild(content);

        return pageContainer;
    }
}