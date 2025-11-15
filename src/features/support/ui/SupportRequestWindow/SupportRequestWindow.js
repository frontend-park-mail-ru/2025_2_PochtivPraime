import template from './SupportRequestWindow.precompiled.js';
import './SupportRequestWindow.scss';
import { Button } from '../../../../shared/ui/Button/Button.js';
import { Input } from '../../../../shared/ui/Input/Input.js';

export class SupportRequestWindow {
  static activeInstance = null; // только одно окно за раз

  /**
   * @param {Object} options
   * @param {Object} options.request - данные обращения
   * @param {Function} options.onDelete - вызывается при удалении
   * @param {Function} [options.onClose] - вызывается при закрытии окна
   */
  constructor({ request, onDelete, onClose }) {
    this.request = request;
    this.onDelete = onDelete;
    this.onClose = onClose;
    this.element = null;
  }

  show() {
    // Закрываем предыдущее, если есть
    if (SupportRequestWindow.activeInstance && SupportRequestWindow.activeInstance !== this) {
      SupportRequestWindow.activeInstance.close();
    }

    // Убираем, если уже в DOM
    if (this.element?.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    const rendered = this.render();

    if (document.body) {
      document.body.appendChild(rendered);
      SupportRequestWindow.activeInstance = this;

      // Слушатель клика вне окна
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  render() {
    const statusLabels = {
      open: 'Открыто',
      in_progress: 'В работе',
      closed: 'Закрыто'
    };

    const html = template({
      title: 'Детали обращения',
      description: this.request.description,
      createdAt: this.formatDate(this.request.createdAt),
      statusLabel: statusLabels[this.request.status] || this.request.status,
      statusClass: `support-request-window__status--${this.request.status}`
    });

    const div = document.createElement('div');
    div.innerHTML = html.trim();
    this.element = div.firstElementChild;

    if (!this.element) return document.createElement('div');

    // --- Input-поля (readonly) ---
    const fields = [
      { key: 'username', value: this.request.username, containerClass: '.support-request-window__username-input' },
      { key: 'email', value: this.request.email, containerClass: '.support-request-window__email-input' },
      { key: 'category', value: this.request.category, containerClass: '.support-request-window__category-input' },
    ];

    fields.forEach(field => {
      const container = this.element.querySelector(field.containerClass);
      if (container) {
        const input = new Input('text', '', field.value, field.key, true); // readonly
        container.appendChild(input.render());
      }
    });

    // --- Кнопка удаления ---
    const deleteButtonWrapper = this.element.querySelector('.support-request-window__delete-button-wrapper');
    if (deleteButtonWrapper) {
      const deleteBtn = new Button('Удалить запрос', () => {
          this.handleDelete();
      });
      deleteButtonWrapper.appendChild(deleteBtn.render());
    }

    // --- Крестик закрытия ---
    const closeButton = this.element.querySelector('.support-request-window__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }

    return this.element;
  }

  handleOutsideClick = (e) => {
    if (this.element && !this.element.contains(e.target)) {
      this.close();
    }
  };

  handleDelete() {
    this.onDelete(this.request.id);
    this.close();
  }

  close() {
    if (this.element?.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    document.removeEventListener('click', this.handleOutsideClick);

    if (SupportRequestWindow.activeInstance === this) {
      SupportRequestWindow.activeInstance = null;
    }

    if (this.onClose) {
      this.onClose();
    }
  }

  getCategoryLabel(value) {
    const labels = {
      bug: 'Баг',
      feature: 'Предложение',
      access: 'Продуктовая жалоба'
    };
    return labels[value] || value;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}