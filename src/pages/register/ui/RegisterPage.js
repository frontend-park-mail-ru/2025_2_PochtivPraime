import { Form } from '../../../shared/ui/Form/Form.js';
import { Input } from '../../../shared/ui/Input/Input.js';
import { Button } from '../../../shared/ui/Button/Button.js';

/**
 * Класс страницы регистрации
 */
export class RegisterPage {
    /**
     * @param {(values: {login: string, password: string, confirmPassword: string}) => void} onRegister - обработчик отправки формы
     * @param {() => void} onGoToLoginPage - переход на страницу логина по ссылке
     */
    constructor(onRegister, onGoToLoginPage) {
        this.onRegister = onRegister;
        this.onGoToLoginPage = onGoToLoginPage;
    }

    /**
     * Рендеринг страницы регистрации
     * @returns {HTMLElement}
     */
    render() {
        document.body.className = 'register-page';

        const loginInput = new Input('username', 'Имя пользователя', '', 'login');
        const emailInput = new Input('email', 'Почта', '', 'email');
        const passwordInput = new Input('password', 'Пароль', '', 'new-password');
        const confirmPasswordInput = new Input('password', 'Подтвердите пароль', '', 'confirm-password');

        const submitButton = new Button('Зарегистрироваться', () => {});

        const form = new Form(
            [loginInput, emailInput, passwordInput, confirmPasswordInput],
            submitButton,
            (values) => this.onRegister(values),
            "Регистрация",
            true
        );

        const pageContainer = document.createElement('div');
        pageContainer.className = 'register-page-wrapper';
        const registerWrapper = document.createElement('div');
        registerWrapper.className = 'register-wrapper';

        pageContainer.appendChild(registerWrapper);
        registerWrapper.appendChild(form.render());

        const link = document.createElement('p');
        link.className = 'register-page__link';
        link.innerHTML = `<a href="#">Уже есть аккаунт?</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoToLoginPage();
        });
        registerWrapper.appendChild(link);

        return pageContainer;
    }
}