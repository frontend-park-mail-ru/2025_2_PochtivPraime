import template from './SupportWidget.precompiled.js';
import './SupportWidget.scss';
import { Button } from '../../../../shared/ui/Button/Button.js';
import { Input } from '../../../../shared/ui/Input/Input.js';

export class SupportWidget {
  constructor({ username, email, onSubmit }) {
    this.username = username || '';
    this.email = email || '';
    this.onSubmit = onSubmit;
    this.element = null;
    this.categorySelect = null;
    this.descriptionTextarea = null;
    this.usernameInput = null;
    this.emailInput = null;
  }

  render() {
    const categories = [
      { value: 'bug', label: 'Баг' },
      { value: 'feature', label: 'Предложение' },
      { value: 'access', label: 'Продуктовая жалоба' }
    ];

    const html = template({
      title: 'Обращение в техподдержку',
      categories,
    });

    const div = document.createElement('div');
    div.innerHTML = html;
    this.element = div.firstElementChild;
    const usernameContainer = this.element.querySelector('.support-widget__username-input');

    if (this.username === '') {
        this.usernameInput = new Input('username', 'Ваш логин', this.username, 'username');
    } else {
        this.usernameInput = new Input('username', 'Ваш логин', this.username, 'username', true);
    }
    const inputEl = this.usernameInput.render();
    if (this.username !== '') {
        const inputField = inputEl.querySelector('input');

        inputField.setAttribute('readonly', true);
        inputField.classList.add('input-wrapper--readonly');
    }
    const emailContainer = this.element.querySelector('.support-widget__email-input');

  
    this.emailInput = new Input('email', 'Ваш email', this.email, 'email');

    usernameContainer.appendChild(inputEl);
    emailContainer.appendChild(this.emailInput.render());

    this.categorySelect = this.element.querySelector('select[name="category"]');

    // --- Описание ---
    this.descriptionTextarea = this.element.querySelector('textarea[name="description"]');

    // Автоподгонка textarea
    const autoResize = () => {
      this.descriptionTextarea.style.height = '0px';
      this.descriptionTextarea.style.height = this.descriptionTextarea.scrollHeight + 'px';
    };
    this.descriptionTextarea.addEventListener('input', autoResize);
    setTimeout(autoResize, 0);

    // --- Кнопка отправки ---
    const buttonWrapper = this.element.querySelector('.support-widget__submit-button-wrapper');
    if (buttonWrapper) {
      const button = new Button('Создать обращение', () => {
        this.handleSubmit();
      });
      buttonWrapper.appendChild(button.render());
    }

    return this.element;
  }

  handleSubmit() {
    const username = this.usernameInput.getValue();
    const email = this.emailInput.getValue();
    const category = this.categorySelect.label;
    const description = this.descriptionTextarea.value.trim();

    // Очистка сообщений
    this.setError('');
    this.setSuccess('');

    if (!description) {
      this.setError('Пожалуйста, опишите проблему.');
      return;
    }

    this.onSubmit({
      username,
      email,
      category,
      description
    });

    // УСПЕХ
    this.setSuccess(
      `Обращение отправлено! Все ваши обращения можете посмотреть 
      <a href="/support/requests" class="support-widget__link">здесь</a>.`
    );
  }

  setError(message) {
    const err = this.element.querySelector('.support-widget__error');
    const ok = this.element.querySelector('.support-widget__success');
    ok.hidden = true;

    if (message) {
        err.textContent = message;
        err.hidden = false;
    } else {
        err.hidden = true;
    }
}

setSuccess(html) {
    const err = this.element.querySelector('.support-widget__error');
    const ok = this.element.querySelector('.support-widget__success');
    err.hidden = true;

    if (html) {
        ok.innerHTML = html;
        ok.hidden = false;
    } else {
        ok.hidden = true;
    }
}
}