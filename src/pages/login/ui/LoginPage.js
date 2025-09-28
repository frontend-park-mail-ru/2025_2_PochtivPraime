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
        const loginInput = new Input('login', 'Имя пользователя');
        const passwordInput = new Input('password', 'Пароль');

        const submitButton = new Button('Войти', () => {
            if (form.validate()) {
                this.onLogin({
                    login: loginInput.getValue(),
                    password: passwordInput.getValue()
                });
            }
        });

        const form = new Form([loginInput, passwordInput], submitButton, (values) => {
            this.onLogin(values);
        }, "Вход");

        const pageContainer = document.createElement('div');
        pageContainer.appendChild(form.render());

        const link = document.createElement('p');
        link.innerHTML = `<a href="#">Создать аккаунт</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoToRegisterPage();
        });
        pageContainer.appendChild(link);

        return pageContainer;
    }
}