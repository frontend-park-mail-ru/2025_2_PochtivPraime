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
        const pageContainer = document.createElement('div');
        pageContainer.className = 'login-page';

        const loginWrapper = document.createElement('div');
        loginWrapper.className = 'login-page__wrapper';

        const formCard = document.createElement('div');
        formCard.className = 'login-page__form-card';

        const loginInput = new Input('username', 'Имя пользователя', '', 'login');
        const passwordInput = new Input('password', 'Пароль', '', 'password');
        const submitButton = new Button('Войти', () => {});
        const form = new Form(
            [loginInput, passwordInput],
            submitButton,
            async (values) => {
                const errorMessage = await this.onLogin(values);
                if (errorMessage) {
                    form.setServerError(errorMessage);
                }
            },
            "Вход",
            true
        );
        formCard.appendChild(form.render())

        const link = document.createElement('p');
        link.className = 'login-page__link';
        link.innerHTML = `<a href="#">Создать аккаунт</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoToRegisterPage();
        });
        formCard.appendChild(link);
        loginWrapper.appendChild(formCard);

        pageContainer.appendChild(loginWrapper);

        return pageContainer;
    }
}