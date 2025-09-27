// LoginPage.js
import { Form } from '../shared/ui/Form/Form.js';
import { Input } from '../shared/ui/Input/Input.js';
import { Button } from '../shared/ui/Button/Button.js';

export class LoginPage {
    constructor(onLogin) {
        this.onLogin = onLogin;
    }

    render() {
        const usernameInput = new Input('Username', 'username', 'text');
        const passwordInput = new Input('Password', 'password', 'password');
        const submitButton = new Button('Login', () => {
            const values = form.getValues();
            this.onLogin(values);
        });

        const form = new Form({
            inputs: [usernameInput, passwordInput],
            submitButton: submitButton,
            onSubmit: (values) => {
                this.onLogin(values);
            }
        });

        return form.render();
    }
}