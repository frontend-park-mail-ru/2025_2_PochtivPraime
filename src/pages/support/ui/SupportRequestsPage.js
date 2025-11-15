import { SupportRequestCard } from '../../../features/support/ui/SupportRequestCard/SupportRequestCard.js';
import { Pagination } from '../../../shared/ui/Pagination/Pagination.js';

export class SupportRequestsPage {
  constructor({ requests, currentPage, totalPages, onDelete, onPageChange }) {
    this.requests = requests || [];
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.onDelete = onDelete;
    this.onPageChange = onPageChange;
  }

  render() {
    const page = document.createElement('div');
    page.className = 'support-requests-page';

    const title = document.createElement('h1');
    title.className = 'support-requests-page__title';
    title.textContent = 'Ваши запросы';
    page.appendChild(title);

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'support-requests-page__cards';

    if (this.requests.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'support-requests-page__empty';
      empty.textContent = 'У вас пока нет обращений';
      cardsContainer.appendChild(empty);
    } else {
      const limited = this.requests.slice(0, 100);
      limited.forEach(request => {
        const card = new SupportRequestCard(request, this.onDelete);
        cardsContainer.appendChild(card.render());
      });
    }

    page.appendChild(cardsContainer);

    if (this.totalPages > 1) {
      const paginationContainer = document.createElement('div');
      paginationContainer.className = 'support-requests-page__pagination';

      const pagination = new Pagination({
        currentPage: this.currentPage,
        totalPages: this.totalPages,
        onPrev: () => {
          if (this.currentPage > 1) this.onPageChange(this.currentPage - 1);
        },
        onNext: () => {
          if (this.currentPage < this.totalPages) this.onPageChange(this.currentPage + 1);
        }
      });

      paginationContainer.appendChild(pagination.render());
      page.appendChild(paginationContainer);
    }

    return page;
  }
}