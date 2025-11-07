import template from './TaskCard.precompiled.js';
import './TaskCard.scss';
import { TaskWindow } from '../../../../widgets/TaskWindow/TaskWindow.js';

/**
 * Класс компонента - карточка задачи.
 * Использует precompiled Handlebars-шаблон.
 */
export class TaskCard {
    /**
     * @param {Object} taskData - данные задачи
     * @param {string} taskData.id - ID задачи
     * @param {string} taskData.title - название задачи
     * @param {boolean} taskData.isCompleted - статус завершения задачи
     * @param {function} onSave - колбэк при сохранении задачи
     * @param {function} onDelete - колбэк при удалении задачи
     * @param {function} onToggleComplete - колбэк при переключении статуса завершения
     * @param {boolean} isNew - флаг, указывающий, что задача новая и сразу открывается в режиме редактирования
     */
    constructor(taskData, onSave, onDelete, onToggleComplete, isNew = false) {
        this.taskData = taskData;
        this.onSave = onSave;
        this.onDelete = onDelete;
        this.onToggleComplete = onToggleComplete;

        this.isEditing = isNew;
        this.isNew = isNew;
        this.isCompleted = taskData.isCompleted || false;
        this.title = taskData.content || '';
    }

    /**
     * Рендер компонента на основе шаблона
     * @returns {HTMLElement}
     */
    render() {
        const html = template({
            id: this.taskData.id,
            title: this.taskData.content,
            isCompleted: this.isCompleted,
            isEditing: this.isEditing
        });

        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;

        this.bindEvents();
        return this.element;
    }

    /**
     * привязка событий к элементам компонента
     */
    bindEvents() {
        //автоподгон textarea
        const textarea = this.element.querySelector('.task-card__input');
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

        // кнопка сохранить
        const saveButton = this.element.querySelector('.task-card__save');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.saveEdit();
            });
        }

        // кнопка удалить
        const deleteButton = this.element.querySelector('.task-card__delete');
        if (deleteButton) {
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTask();
            });
        }

        // кнопка редактирования
        const editButton = this.element.querySelector('.task-card__edit');
        if (editButton) {
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.startEdit();
            });
        }

        // чекбокс
        const checkbox = this.element.querySelector('.task-card__checkbox');
        if (checkbox) {
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleComplete();
            });
        }

        // переход при клике по карточке
        this.element.addEventListener('click', (e) => {
            if (this.isEditing) return;
            this.openTaskWindow();
        });
    }

    /**
     * Переключение статуса завершения задачи
     */
    toggleComplete() {
        this.isCompleted = !this.isCompleted;
        this.taskData.isCompleted = this.isCompleted;
        if (this.onToggleComplete) {
            console.log("your", this.task)
            this.onToggleComplete(this.taskData.id, this.isCompleted);
        }
        this.rerender();
    }

    /**
     * Начало редактирования задачи
     */
    startEdit() {
        this.isEditing = true;
        this.rerender();
        setTimeout(() => {
            const input = this.element.querySelector('.task-card__input');
            if (input) {
                input.focus();
                input.select();
            }
        }, 0);
    }

    /**
     * Сохранение изменений задачи
     * @param {string|null} newTitle - новое название задачи
     */
    async saveEdit(newTitle = null) {
        if (newTitle === null) {
            const input = this.element.querySelector('.task-card__input');
            newTitle = input ? input.value.trim() : '';
        }

        // если новая задача и пустое название — удаляем
        if (this.taskData._isNew && !newTitle) {
            if (this.element?.parentNode) this.element.parentNode.removeChild(this.element);
            if (this.onDelete) this.onDelete(null);
            return;
        }

        this.taskData.content = newTitle;
        this.title = newTitle;

        if (this.taskData._isNew && this.onSave) {
            console.log("new")
            const created = await this.onSave(this.taskData); // сохраняем на сервер
            console.log(created);
            if (created?.id){
                this.taskData.id = created.id;
                this.taskData._isNew = false;
            }
        } else if (this.onSave) {
            console.log("not new")
            await this.onSave(this.taskData, newTitle);
        }

        this.isEditing = false; // отключаем режим редактирования
        this.isNew = false;
        this.taskData._isNew = false;

        // обновляем родителя, но передаём уже обновлённую задачу
        if (this.onRerenderParent) {
            this.onRerenderParent(this.taskData); 
        } else {
            this.rerender();
        }
    }

    /**
     * Открытие окна задачи
     */
    openTaskWindow() {
        const taskWindow = new TaskWindow(this.taskData, {
            onClose: (updatedTask) => {
                console.log(!updatedTask.content==this.taskData.content);
                if (updatedTask.content !== this.taskData.content ||
                updatedTask.isCompleted !== this.taskData.isCompleted)  {
                    this.taskData = { ...updatedTask };
                    console.log(this.taskData);
                    console.log(this.taskData.content)
                    if (this.saveEdit && this.taskData.content)
                        this.saveEdit(this.taskData.content);
                }
            },
            onDelete: async () => {
                await this.onDelete?.(this.taskData.id);
                if (this.element?.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
            },
            onToggleComplete: (taskId, isCompleted) => {
                if (this.onToggleComplete)
                    this.onToggleComplete(taskId, isCompleted);
            }
        });
        document.body.appendChild(taskWindow.render());
    }

    /**  
     * Удаление задачи
     */
    deleteTask() {
        if (this.onDelete) {
            this.onDelete(this.taskData.id);
        }
    }

    /**
     * Перерисовка компонента
     */
    rerender() {
        const oldElement = this.element;
        const newElement = this.render();
        if (oldElement && oldElement.parentNode) {
            oldElement.parentNode.replaceChild(newElement, oldElement);
        }
        this.element = newElement;
    }
}