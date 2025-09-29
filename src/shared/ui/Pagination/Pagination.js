import template from './Pagination.precompiled.js';
import { Button } from '../Button/Button.js';

/**
 * Компонент пагинации с использованием шаблона и компонента Button.
 */
export class Pagination {
    /**
     * @param {Object} params
     * @param {number} params.currentPage - текущая страница
     * @param {number} params.totalPages - общее количество страниц
     * @param {() => void} params.onPrev - обработчик нажатия "Назад"
     * @param {() => void} params.onNext - обработчик нажатия "Вперёд"
     */
    constructor({ currentPage, totalPages, onPrev, onNext }) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.onPrev = onPrev;
        this.onNext = onNext;

        this.isFirstPage = currentPage <= 1;
        this.isLastPage = currentPage >= totalPages;
    }

    render() {
        const html = template({
            currentPage: this.currentPage,
            totalPages: this.totalPages
        });

        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;

        const prevButton = new Button(
            'Назад',
            () => {
                if (!this.isFirstPage && this.onPrev) this.onPrev();
            },
            this.isFirstPage
        );

        const nextButton = new Button(
            'Вперед',
            () => {
                if (!this.isLastPage && this.onNext) this.onNext();
            },
            this.isLastPage
        );

        const prevContainer = this.element.querySelector('#pagination-prev-container');
        const nextContainer = this.element.querySelector('#pagination-next-container');

        if (prevContainer) prevContainer.appendChild(prevButton.render());
        if (nextContainer) nextContainer.appendChild(nextButton.render());

        return this.element;
    }
}