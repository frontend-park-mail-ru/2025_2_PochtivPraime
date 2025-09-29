import template from './Form.precompiled.js';

/**
 * Класс Form — управляет набором полей ввода и кнопкой. Поддерживает отображение ошибок от сервера.
 * Использует precompiled Handlebars-шаблон. 
*/
export class Form {
  /**
   * @param {Input[]} inputs - массив компонентов полей ввода
   * @param {Button} button - кнопка отправки формы
   * @param {(values: Object) => void} onSubmit - обработка отправки формы
   * @param {string} [title=''] - заголовок
   * @param {boolean} [display_logo=false] - отображать лого или нет
   */
  constructor(inputs, button, onSubmit, title = '',display_logo= false) {
    this.inputs = inputs;
    this.button = button;
    this.onSubmit = onSubmit;
    this.title = title;
    this.display_logo = display_logo;
  }

  /**
   * Проверяет валидность всех полей формы.
   * @returns {boolean} true, если все поля валидны
   */
  validate() {
    let isValid = true;
    for (const input of this.inputs) {
      if (!input.validate()) {
        isValid = false;
      }
    }
    const passwordInput = this.inputs.find(i => i.name === 'new-password');
    const confirmPasswordInput = this.inputs.find(i => i.name === 'confirm-password');

    if (passwordInput && confirmPasswordInput) {
      if (passwordInput.getValue() !== confirmPasswordInput.getValue()) {
        confirmPasswordInput.setError('Пароли не совпадают');
        isValid = false;
      }
    }
    return isValid;
  }

  /**
   * Отображает ошибку от сервера
   * @param {string} message - текст ошибки
   */
  setServerError(message) {
    if (!this.element) return;
    const errorContainer = this.element.querySelector('.form__error');
    
    if (message) {
        errorContainer.textContent = message;
        errorContainer.hidden = false;
    } else {
        errorContainer.textContent = '';
        errorContainer.hidden = true;
    }
}

  /**
   * Рендер формы на основе шаблона. Обработка отправки формы
   * @returns {HTMLElement}
   */
  render() {
    const html = template({
       title: this.title,
       display_logo: this.display_logo
      });
    const div = document.createElement('div');
    div.innerHTML = html;
    this.element = div.firstElementChild; // ← это .form-container

    // Находим форму внутри контейнера
    const form = this.element.querySelector('.form');
    this.inputsContainer = form.querySelector('.form__inputs');
    this.actionsContainer = form.querySelector('.form__actions');

    // Рендерим инпуты и кнопку
    this.inputs.forEach(input => {
        this.inputsContainer.appendChild(input.render());
    });
    this.actionsContainer.appendChild(this.button.render());

    // Обработчик отправки
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.setServerError('');

        if (this.validate()) {
            const values = {};
            this.inputs.forEach(input => {
                values[input.type] = input.getValue();
            });
            const errorMessage = this.onSubmit(values);
            this.setServerError(errorMessage);
        }
    });

    return this.element; // возвращаем .form-container
    }
}