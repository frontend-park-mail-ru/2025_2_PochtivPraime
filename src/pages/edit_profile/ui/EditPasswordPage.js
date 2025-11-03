import { Header } from '../../../widgets/Header/Header.js';
import { Form } from '../../../shared/ui/Form/Form.js';
import { Input } from '../../../shared/ui/Input/Input.js';
import { Button } from '../../../shared/ui/Button/Button.js';

/**
 * Класс страницы смены пароля
 */
export class EditPasswordPage {
    /**
     * @param {{ username: string, email: string }} userData - данные пользователя для header
     * @param {(values: { oldPassword: string, newPassword: string, confirmPassword: string }) => void} onChangePassword - обработчик отправки формы
     * @param {() => void} onGoBack - переход на страницу редактирования профиля
     * @param {() => void} onLogout - выход из аккаунта
     * @param {(path: string) => void} onNavigate - навигация по страницам
     */
    constructor(userData = {}, onChangePassword, onGoBack, onLogout, onNavigate) {
        this.userData = userData;
        this.onChangePassword = onChangePassword;
        this.onGoBack = onGoBack;
        this.onLogout = onLogout;
        this.onNavigate = onNavigate;
    }

    render() {
        document.body.className = 'edit-password-page';

        const pageContainer = document.createElement('div');
        pageContainer.className = 'edit-password-page-container';

        const header = new Header(this.userData, this.onLogout, this.onNavigate);
        pageContainer.appendChild(header.render());

        const content = document.createElement('main');
        content.className = 'edit-password-page__content';
        pageContainer.appendChild(content);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'edit-password-wrapper';
        content.appendChild(contentWrapper);

        const oldPasswordInput = new Input('password', 'Старый пароль', '', 'old-password');
        const newPasswordInput = new Input('password', 'Новый пароль', '', 'new-password');
        const confirmPasswordInput = new Input('password', 'Подтвердите новый пароль', '', 'confirm-password');

        const submitButton = new Button('Сохранить изменения', () => {});

        const form = new Form(
            [oldPasswordInput, newPasswordInput, confirmPasswordInput],
            submitButton,
            (values) => {
                const errorMessage = this.onChangePassword(values);
                if (errorMessage) {
                    form.setServerError(errorMessage);
                } else {
                    form.setServerSucess('Пароль успешно изменён!');
                }
            },
            'Изменение пароля',
            true
        );

        contentWrapper.appendChild(form.render());

        const link = document.createElement('p');
        link.className = 'edit-password-page__link';
        link.innerHTML = `<a href="#">Вернуться к редактированию профиля</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoBack();
        });
        contentWrapper.appendChild(link);

        return pageContainer;
    }
}