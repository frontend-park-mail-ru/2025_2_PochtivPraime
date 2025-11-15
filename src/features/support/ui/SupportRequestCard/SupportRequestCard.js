export class SupportRequestCard {
  constructor(request, onDelete) {
    this.request = request;
    this.onDelete = onDelete;
    this.element = null;
  }

  render() {
    const statusToClass = {
      'Открыто': 'open',
      'В работе': 'in_progress',
      'Закрыто': 'closed'
    };

    const statusLabel = this.request.form_status || 'Неизвестно';
    const statusClass = `support-request-card__status--${statusToClass[statusLabel] || 'unknown'}`;

    const html = template({
      id: this.request.id,
      statusLabel,
      statusClass
    });

    const div = document.createElement('div');
    div.innerHTML = html.trim();
    this.element = div.firstElementChild;
    if (!this.element) return document.createElement('div');

    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
      const window = new SupportRequestWindow({
        request: this.request,
        onDelete: this.onDelete,
        onClose: () => {}
      });
      window.show();
    });

    return this.element;
  }
}