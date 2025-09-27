// RegisterPage.js
import { Form } from '../shared/ui/Form/Form.js';
import { Input } from '../shared/ui/Input/Input.js';
import { Button } from '../shared/ui/Button/Button.js';

export class RegisterPage {
    constructor(onRegister) {
        // Функция, которую вызываем после регистрации
        // Обычно здесь сразу логиним пользователя
        this.onRegister = onRegister;
    }

    render() {
        const usernameInput = new Input('Username', 'username', 'text');
        const emailInput = new Input('Email', 'email', 'email');
        const passwordInput = new Input('Password', 'password', 'password');
        const confirmPasswordInput = new Input('Confirm Password', 'confirmPassword', 'password');

        const submitButton = new Button('Register', () => {
            const values = form.getValues();

            if (values.password !== values.confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            this.onRegister(values);
        });

        const form = new Form({
            inputs: [usernameInput, emailInput, passwordInput, confirmPasswordInput],
            submitButton: submitButton,
            onSubmit: (values) => {
                if (values.password !== values.confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }

                this.onRegister(values);
            }
        });

        return form.render();
    }
}