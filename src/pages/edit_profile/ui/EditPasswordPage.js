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

        const pageContainer = document.createElement('div');
        pageContainer.className = 'edit-password-page';

        const content = document.createElement('main');
        content.className = 'edit-password-page__content';

        const formCard = document.createElement('div');
        formCard.className = 'edit-password-page__form-card';


        const header = new Header(this.userData, this.onLogout, this.onNavigate);

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

        const link = document.createElement('p');
        link.className = 'edit-password-page__link';
        link.innerHTML = `<a href="#">Вернуться к редактированию профиля</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoBack();
        });

        formCard.appendChild(form.render());
        formCard.appendChild(link);
        content.appendChild(formCard);
        pageContainer.appendChild(header.render());
        pageContainer.appendChild(content);

        return pageContainer;
    }
}