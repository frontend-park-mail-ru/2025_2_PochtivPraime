import template from './SupportRequestCard.precompiled.js';
import './SupportRequestCard.scss';

// Предполагаем, что SupportRequestWindow доступен по относительному пути
import { SupportRequestWindow } from '../SupportRequestWindow/SupportRequestWindow.js';

export class SupportRequestCard {
  /**
   * @param {Object} request — объект обращения
   * @param {Function} onDelete — обработчик удаления (передаётся в SupportRequestWindow)
   */
  constructor(request, onDelete) {
    this.request = request;
    this.onDelete = onDelete;
    this.element = null;
  }

  render() {
    const statusLabels = {
      open: 'Открыто',
      in_progress: 'В работе',
      closed: 'Закрыто'
    };

    const statusLabel = statusLabels[this.request.status] || this.request.status;
    const statusClass = `support-request-card__status--${this.request.status}`;

    const html = template({
      id: this.request.id,
      statusLabel,
      statusClass
    });

    const div = document.createElement('div');
    div.innerHTML = html.trim();
    this.element = div.firstElementChild;

    if (!this.element) return document.createElement('div');

    // Обработчик клика по карточке
    this.element.addEventListener('click', (e) => {
      // Предотвращаем закрытие, если клик по кнопке в будущем (сейчас не нужно, но на всякий)
      e.stopPropagation();

      const window = new SupportRequestWindow({
        request: this.request,
        onDelete: this.onDelete,
        onClose: () => {} // опционально
      });
      window.show();
    });

    return this.element;
  }
}