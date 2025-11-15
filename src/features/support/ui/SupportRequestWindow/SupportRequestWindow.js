export class SupportRequestWindow {
  static activeInstance = null;

  constructor({ request, onDelete, onClose }) {
    this.request = request;
    this.onDelete = onDelete;
    this.onClose = onClose;
    this.element = null;
  }

  show() {
    if (SupportRequestWindow.activeInstance && SupportRequestWindow.activeInstance !== this) {
      SupportRequestWindow.activeInstance.close();
    }

    if (this.element?.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    const rendered = this.render();
    document.body.appendChild(rendered);
    SupportRequestWindow.activeInstance = this;
    document.addEventListener('click', this.handleOutsideClick);
  }

  render() {
    // Маппинг статусов для CSS-классов
    const statusToClass = {
      'Открыто': 'open',
      'В работе': 'in_progress',
      'Закрыто': 'closed'
    };

    const statusLabel = this.request.form_status || 'Неизвестно';
    const statusClass = `support-request-window__status--${statusToClass[statusLabel] || 'unknown'}`;

    const html = template({
      title: 'Детали обращения',
      description: this.request.text, // <-- из API: text
      createdAt: this.formatDate(this.request.created_at), // <-- created_at
      statusLabel,
      statusClass
    });

    const div = document.createElement('div');
    div.innerHTML = html.trim();
    this.element = div.firstElementChild;
    if (!this.element) return document.createElement('div');

    // Поля для отображения (readonly)
    const fields = [
      // УБРАНО: username (его нет в API)
      // { key: 'username', value: this.request.username, containerClass: '.support-request-window__username-input' },
      
      { key: 'email', value: this.request.contact_email, containerClass: '.support-request-window__email-input' },
      
      // form_type вместо category
      { key: 'category', value: this.request.form_type, containerClass: '.support-request-window__category-input' },
    ];

    fields.forEach(field => {
      const container = this.element.querySelector(field.containerClass);
      if (container) {
        const input = new Input('text', '', field.value, field.key, true);
        container.appendChild(input.render());
      }
    });

    // Кнопка удаления
    const deleteButtonWrapper = this.element.querySelector('.support-request-window__delete-button-wrapper');
    if (deleteButtonWrapper) {
      const deleteBtn = new Button('Удалить запрос', () => this.handleDelete());
      deleteButtonWrapper.appendChild(deleteBtn.render());
    }

    // Крестик
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
    if (this.onClose) this.onClose();
  }

  formatDate(dateString) {
    if (!dateString) return '—';
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