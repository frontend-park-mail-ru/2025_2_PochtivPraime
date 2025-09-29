import template from './Input.precompiled.js';

/**
 * Класс Input — Компонент для текстовых полей с валидацией и отображением ошибок.
 * Использует precompiled Handlebars-шаблон. 
 */
export class Input {
  /**
   * Поле ввода
   * @param {'text'|'email'|'password'|'login'} [type='text'] - тип поля
   * @param {string} [placeholder=''] - текст по умолчанию
   * @param {string} [value=''] - значение поля
   * @param {string} [name=''] - имя поля для формы и автозаполнения
   */
  constructor(type = 'text', placeholder = '', value = '', name='') {
    this.type = type;
    this.placeholder = placeholder;
    this.value = value;
    this.error = '';
    this.wrapper = null;
    this.element = null;
    this.name = name;
  }

  /**
   * Проверка валидации и определение ошибки
   * @returns {boolean} true, если значение корректное.
   */
  validate() {
    this.error = '';

    if (!this.value.trim()) {
      this.error = 'Поле не может быть пустым';
    } else if (this.type === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
        this.error = 'Некорректный email';
      }
    } else if (this.type === 'password') {
      if (this.value.length < 6) {
        this.error = 'Пароль должен быть не менее 6 символов';
      }
    } else if (this.type === 'login') {
      if (this.value.length < 3) {
        this.error = 'Имя пользователя должно быть не менее 3 символов';
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.value)) {
        this.error = 'Имя пользователя может содержать только латинские буквы, цифры и подчеркивание (_)';
      }
    }

    this.element.classList.remove('is-valid', 'is-invalid');
    if (this.error) {
        this.element.classList.add('is-invalid');
    } else {
        this.element.classList.add('is-valid');
    }

    this.update();
    return this.error === '';
  }

  /**
   * Добавить ошибку
   * @param {string} message - текст ошибки
   */
  setError(message) {
    this.error = message;
    if (this.element) {
      this.element.classList.remove('is-valid', 'is-invalid');
      if (this.error) {
        this.element.classList.add('is-invalid');
      } else {
        this.element.classList.add('is-valid');
      }
    }
    this.update();
  }

  /**
   * Возвращает текущее значение
   * @returns {string}
   */
  getValue() {
    return this.value;
  }

  /**
   * Рендерит компонент на основе шаблона и добавляет реакцию на заполнение
   * @returns {HTMLElement}
   */
  render() {
    const html = template({
      type: this.type,
      placeholder: this.placeholder,
      value: this.value,
      error: this.error,
      name: this.name
    });

    const div = document.createElement('div');
    div.innerHTML = html;

    this.wrapper = div.firstElementChild;
    this.element = this.wrapper.querySelector('input');

    this.element.addEventListener('input', (e) => {
      this.value = e.target.value;
      this.validate();
    });

    return this.wrapper;
  }

 /**
 * Обновление ошибки
 */
update() {
    if (!this.wrapper) return;

    const errorSpan = this.wrapper.querySelector('.error');
    if (this.error) {
        errorSpan.textContent = this.error;
    } else {
        errorSpan.textContent = '';
    }
  }
}