import { SupportWidget } from '../../../features/support/ui/SupportWidget/SupportWidget.js';

export class SupportFormPage {
    constructor(userData, onSubmitTicket) {
        this.userData = userData;
        this.onSubmitTicket = onSubmitTicket;
    }

    render() {
        if (window.location.pathname === '/support') {
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.height = '100vh';
            document.body.style.display = 'flex';
            document.body.style.justifyContent = 'center';
            document.body.style.alignItems = 'center';
        }
        if (window.parent !== window) {
            document.body.style.backgroundImage = 'none';
        }

        const widget = new SupportWidget({
            username: this.userData.username,
            email: this.userData.email,
            onSubmit: (formData) => {
                const error = this.onSubmitTicket(formData);

                if (error) {
                    widget.setError(error);
                } else {
                    widget.setSuccess(`
                        Обращение отправлено!<br>
                        Все ваши обращения можете посмотреть 
                        <a class="support-widget__link" href="/support/requests">здесь</a>.
                    `);
                    if (window.parent !== window) {
                        window.parent.postMessage({ type: 'SUPPORT_SUBMITTED' }, '*');
                    }
                }
            }
        });

        return widget.render();
    }
}