import template from './TaskWindow.precompiled.js';
import './TaskWindow.css';
import { Menu } from '../../shared/ui/Menu/Menu.js';

/**
 * Класс компонента - окно задачи.
 * Использует precompiled Handlebars-шаблон.
 */
export class TaskWindow {
    /**
     * @param {Object} taskData - данные задачи
     * @param {string} taskData.id - ID задачи
     * @param {string} taskData.title - название задачи
     * @param {boolean} taskData.isCompleted - статус завершения задачи
     * @param {Object} options - опции колбэков
     * @param {function} options.onClose - колбэк при закрытии окна
     * @param {function} options.onDelete - колбэк при удалении задачи
     * @param {function} options.onToggleComplete - колбэк при переключении статуса завершения
     */
    constructor(taskData, options = {}) {
        this.taskData = { ...taskData }; // создаём копию для редактирования
        this.options = options; 
        this.isEditing = false;
        this.isCompleted = taskData.isCompleted || false;
        this.title = taskData.title || '';
    }

    /**
     * Рендер компонента на основе шаблона
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            title: this.title,
            isCompleted: this.isCompleted,
            isEditing: this.isEditing
        });

        const div = document.createElement('div');
        div.innerHTML = html.trim();
        this.element = div.firstElementChild;

        this.bindEvents();
        return this.element;
    }

    /**
     * привязка событий к элементам компонента
     */
    bindEvents() {
        
        const checkbox = this.element.querySelector('.task-window__checkbox');
        if (checkbox) {
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleComplete();
            });
        }

        //кнопка закрытия
        const closeBtn = this.element.querySelector('.task-window__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        //кнопка сохранения
        const saveBtn = this.element.querySelector('.task-window__save');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveEdit());
        }

        //клик по тексту для редактирования
        const titleEl = this.element.querySelector('.task-window__title');
        if (titleEl) {
            titleEl.addEventListener('click', () => {
                this.isEditing = true;
                this.rerender();
                setTimeout(() => { // даём время на рендер
                    const input = this.element.querySelector('.task-window__input');
                    if (input) {
                        input.focus();
                        input.select();
                    }
                }, 0);
            });
        }

        //кнопки меню
        const menuBtn = this.element.querySelector('.task-window__menu');
        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openMenu(menuBtn);
            });
        }

        //автоподгон textarea
        const textarea = this.element.querySelector('.task-window__input');
        if (textarea) {
            const autoResize = () => {
                // сбрасываем высоту
                textarea.style.height = '0px';
                // высота реальная по scrollHeight
                textarea.style.height = textarea.scrollHeight + 'px';
            };
            textarea.addEventListener('input', autoResize);
            setTimeout(autoResize, 0);
        }
    }

    /**
     * Переключение статуса завершения задачи
     */
    toggleComplete() {
        this.isCompleted = !this.isCompleted;
        this.taskData.isCompleted = this.isCompleted;
        if (this.options.onToggleComplete) {
            this.options.onToggleComplete(this.taskData.id, this.isCompleted);
        }
        this.rerender();
    }

    /**
     * Открытие меню действий
     * @param {HTMLElement} menuBtn - кнопка открытия меню
     */
    openMenu(menuBtn) {
        const menu = new Menu({
            title: 'Меню задачи',
            actions: [
                {
                    text: 'Удалить карточку',
                    type: 'danger',
                    onClick: () => {
                        menu.close();
                        if (this.options.onDelete) this.options.onDelete(this.taskData.id);
                        this.close();
                    }
                }
            ]
        });

        menu.show();

        // помещаем его справа от кнопки
        const menuEl = menu.element;
        const rect = menuBtn.getBoundingClientRect();
        // справа от кнопки
        const left = rect.right;
        const top = rect.top;
        menuEl.style.top = top + 'px';
        menuEl.style.left = left + 'px';
        menuEl.style.position = 'fixed';
        menuEl.style.zIndex = '1001';
    }

    /**
     * Сохранение изменений задачи
     */
    saveEdit() {
        const input = this.element.querySelector('.task-window__input');
        const newTitle = input ? input.value.trim() : '';
        if (newTitle) {
            this.taskData.title = input.value;
            this.title = input.value;
        }
        this.isEditing = false;
        this.rerender();
    }

    /**
     * Закрытие окна задачи
     */
    close() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        if (this.options.onClose) {
            console.log(this.taskData)
            this.options.onClose(this.taskData); // передаём обновлённую задачу
        }
    }

    /**
     * Перерисовка компонента
     */
    rerender() {
        const oldEl = this.element;
        const newEl = this.render();
        if (oldEl && oldEl.parentNode) {
            oldEl.parentNode.replaceChild(newEl, oldEl);
        }
    }
}