import { Form } from '../../../shared/ui/Form/Form.js';
import { Input } from '../../../shared/ui/Input/Input.js';
import { Button } from '../../../shared/ui/Button/Button.js';

/**
 * Класс страницы регистрации
 */
export class RegisterPage {
    /**
     * @param {function(Object):void} onRegister - отправка формы регистрации
     * @param {function():void} onGoToLoginPage - переход на страницу авторизации по ссылке
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
        const loginInput = new Input('login', 'Имя пользователя');
        const emailInput = new Input('email', 'Email');
        const passwordInput = new Input('password', 'Пароль');

        const submitButton = new Button('Зарегистрироваться', () => {
            if (form.validate()) {
                this.onRegister({
                    login: loginInput.getValue(),
                    email: emailInput.getValue(),
                    password: passwordInput.getValue()
                });
            }
        });

        const form = new Form([loginInput, emailInput, passwordInput], submitButton,(values) => {
            this.onRegister(values);
        },"Регистрация");

        const pageContainer = document.createElement('div');
        pageContainer.appendChild(form.render());

        const link = document.createElement('p');
        link.innerHTML = `<a href="#">Уже есть аккаунт? Войти</a>`;
        link.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.onGoToLoginPage();
        });
        pageContainer.appendChild(link);

        return pageContainer;
    }
}