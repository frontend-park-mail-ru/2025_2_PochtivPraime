import { Form } from '../../../shared/ui/Form/Form.js';
import { Input } from '../../../shared/ui/Input/Input.js';
import { Button } from '../../../shared/ui/Button/Button.js';

/**
 * Класс страницы входа в аккаунт
 */
export class LoginPage {
    /**
     * @param {({login: string, password: string}) => void} onLogin - отправка формы авторизации
     * @param {() => void} onGoToRegisterPage - переход на страницу регистрации по ссылке
     */
    constructor(onLogin, onGoToRegisterPage) {
        this.onLogin = onLogin;
        this.onGoToRegisterPage = onGoToRegisterPage;
    }

    /** 
     * Рендеринг страницы логина
     * @returns {HTMLElement}
     */
    render() {
        document.body.className = 'login-page';

        const loginInput = new Input('login', 'Имя пользователя', '', 'login');
        const passwordInput = new Input('password', 'Пароль', '', 'password');

        const submitButton = new Button('Войти', () => {});

        const form = new Form(
            [loginInput, passwordInput],
            submitButton,
            (values) => this.onLogin(values),
            "Вход",
            true
        );

        const pageContainer = document.createElement('div');
        pageContainer.className = 'login-page-wrapper';
        const loginWrapper = document.createElement('div');
        loginWrapper.className = 'login-wrapper';

        pageContainer.appendChild(loginWrapper);
        loginWrapper.appendChild(form.render());

        const link = document.createElement('p');
        link.className = 'login-page__link';
        link.innerHTML = `<a href="#">Создать аккаунт</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoToRegisterPage();
        });
        loginWrapper.appendChild(link);

        return pageContainer;
    }
}