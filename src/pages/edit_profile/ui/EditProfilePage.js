import { Header } from '../../../widgets/Header/Header.js';
import { Form } from '../../../shared/ui/Form/Form.js';
import { Input } from '../../../shared/ui/Input/Input.js';
import { Button } from '../../../shared/ui/Button/Button.js';

/**
 * Класс страницы редактирования профиля
 */
export class EditProfilePage {
    /**
     * @param {{ username: string, email: string }} userData - текущие данные пользователя
     * @param {(values: { username: string, email: string }) => void} onProfileChange - обработчик отправки формы
     * @param {() => void} onGoToChangePassword - переход на страницу изменения пароля
     * @param {() => void} onLogout - выход из аккаунта
     * @param {(path: string) => void} onNavigate - навигация по страницам
     */
    constructor(userData = {}, onProfileChange, onGoToChangePassword, onLogout, onNavigate) {
        this.userData = userData;
        this.onProfileChange = onProfileChange;
        this.onGoToChangePassword = onGoToChangePassword;
        this.onLogout = onLogout;
        this.onNavigate = onNavigate;
    }

    render() {
        const pageContainer = document.createElement('div');
        pageContainer.className = 'edit-profile-page';

        const content = document.createElement('main');
        content.className = 'edit-profile-page__content';

        const formCard = document.createElement('div');
        formCard.className = 'edit-profile-page__form-card';
        
        const header = new Header(this.userData, this.onLogout, this.onNavigate);

        const usernameInput = new Input('text', 'Имя пользователя', this.userData.username || '', 'username');
        const emailInput = new Input('email', 'Почта', this.userData.email || '', 'email');

        const submitButton = new Button('Сохранить изменения', () => {});

        const form = new Form(
            [usernameInput, emailInput],
            submitButton,
            (values) => {
                const errorMessage = this.onProfileChange(values);
                if (errorMessage) {
                    form.setServerError(errorMessage);
                } else {
                    form.setServerSucess('Профиль успешно обновлён!');
                    const newHeader = new Header(this.userData, this.onLogout, this.onNavigate);
                    pageContainer.replaceChild(newHeader.render(), pageContainer.querySelector('.header'));
                }
            },
            'Редактирование профиля',
            true
        );

        const link = document.createElement('p');
        link.className = 'edit-profile-page__link';
        link.innerHTML = `<a href="#">Изменить пароль</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoToChangePassword();
        });
        
        formCard.appendChild(form.render());
        formCard.appendChild(link);
        content.appendChild(formCard);
        pageContainer.appendChild(header.render());
        pageContainer.appendChild(content);

        return pageContainer;
    }
}