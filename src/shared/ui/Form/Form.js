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
   */
  constructor(inputs, button, onSubmit, title = '') {
    this.inputs = inputs;
    this.button = button;
    this.onSubmit = onSubmit;
    this.title = title;
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
    return isValid;
  }

  /**
   * Отображает ошибку от сервера
   * @param {string} message - текст ошибки
   */
  setServerError(message) {
    if (!this.element) return;
    const errorContainer = this.element.querySelector('.form__error');
    errorContainer.textContent = message;
  }

  /**
   * Рендер формы на основе шаблона. Обработка отправки формы
   * @returns {HTMLElement}
   */
  render() {
    const html = template({ title: this.title });
    const div = document.createElement('div');
    div.innerHTML = html;
    this.element = div.firstElementChild;

    this.inputsContainer = this.element.querySelector('.form__inputs');
    this.inputs.forEach(input => {
      const el = input.render();
      this.inputsContainer.appendChild(el);
    });

    this.actionsContainer = this.element.querySelector('.form__actions');
    this.actionsContainer.appendChild(this.button.render());

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();

      this.setServerError('');

      if (this.validate()) {
        const values = {};
        this.inputs.forEach(input => {
          values[input.type] = input.getValue();
        });
        this.onSubmit(values);
      }
    });

    return this.element;
  }
}