import template from './ListCard.precompiled.js';
import './ListCard.scss';
import { Modal } from '../../../../shared/ui/Modal/Modal.js';
import { TaskCard } from '../../../../entities/Task/ui/TaskCard/TaskCard.js';

/**
 * Класс компонента - список задач.
 * Использует precompiled Handlebars-шаблон.
 */
export class ListCard {
    /**
    * @param {Object} listData - данные списка (id, title, tasks)  
    * @param {Function} onRename - колбэк при переименовании списка (id, newTitle)
    * @param {Function} onDelete - колбэк при удалении списка (id)
    * @param {Function} onAddTask - колбэк при добавлении задачи (listId, taskData)
    * @param {Function} onUpdateTask - колбэк при обновлении задачи (listId, taskId, newTitle, isCompleted, action)
    */
    constructor(listData, onRename, onDelete, onAddTask, onUpdateTask, onDeleteTask) {
        this.listData = listData;
        this.onRename = onRename;
        this.onDelete = onDelete;
        this.onAddTask = onAddTask;
        this.onUpdateTask = onUpdateTask;
        this.onDeleteTask = onDeleteTask;

        this.isEditingTitle = false;
        this.title = listData.title || 'Список';
        this.tasks = listData.tasks || [];
    }

    /**
     * Рендерит компонент и возвращает его корневой элемент.
     * @returns {HTMLElement} - корневой элемент компонента.
     */
    render() {
        const html = template({
            id: this.listData.id,
            title: this.title,
            isEditingTitle: this.isEditingTitle
        });

        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;

        this.bindEvents();
        this.renderTasks();

        return this.element;
    }

    /**
     * Привязывает обработчики событий к элементам компонента.
     */
    bindEvents() {
        const header = this.element.querySelector('.list-card__header');
        if (!header) return;

        // Используем делегирование для кнопок так как они меняются при редактировании заголовка
        header.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.list-card__edit');
            const saveBtn = e.target.closest('.list-card__save');
            const deleteBtn = e.target.closest('.list-card__delete');

            if (editBtn) {
                this.startEditTitle();
            } else if (saveBtn) {
                this.saveTitle();
            } else if (deleteBtn) {
                this.showDeleteConfirmation();
            }
        });

        //инпут для редактирования заголовка
        const input = this.element.querySelector('.list-card__title-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.saveTitle();
                if (e.key === 'Escape') this.cancelEditTitle();
            });
        }

        //кнопка добавления задачи
        const addTaskBtn = this.element.querySelector('.list-card__add');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addNewTask();
            });
        }
    }

    /**
     * Рендерит задачи внутри списка.
     */
    renderTasks() {
        const container = this.element.querySelector('.list-card__tasks');
        if (!container) return;

        container.innerHTML = '';
        this.tasks.forEach(task => {
            const taskCard = new TaskCard(
                task,
                (taskDataOrId, newContent) => {
                    // если новая задача
                    console.log('taskDateOrId', taskDataOrId)
                    if (!taskDataOrId.id) {
                        if (this.onAddTask) {
                            console.log(this.listData.id);
                            this.onAddTask(this.listData.id, taskDataOrId);
                        }
                    } else {
                        // существующая задача
                        if (this.onUpdateTask) {
                            console.log("зашло")
                            this.onUpdateTask(this.listData.id, taskDataOrId.id, { content: taskDataOrId.content });
                        }
                    }

                    // обновляем локально
                    this.tasks = this.tasks.map(t =>
                        t.id === taskDataOrId.id ? { ...t, content: taskDataOrId.content } : t
                    );

                    // 🔹 ререндерим задачи
                    this.renderTasks();
                },
                (taskId) => this.removeTask(taskId),
                (taskId, isCompleted) => {
                    if (this.onUpdateTask) this.onUpdateTask(this.listData.id, taskId, { isCompleted });
                    this.tasks = this.tasks.map(t => t.id === taskId ? { ...t, isCompleted } : t);
                    this.renderTasks();
                },
                task._isNew
            );

            // 🔹 колбэк для ререндеринга родителя после saveEdit
            taskCard.onRerenderParent = (updatedTask) => {
                if (updatedTask) {
                    this.tasks = this.tasks.map(t =>
                        t._isNew && !updatedTask._isNew ? { ...updatedTask } : t
                    );
                }
                this.renderTasks();
            };

            container.appendChild(taskCard.render());
        });
    }
    
    /**
     * Начинает редактирование заголовка списка.
     */
    startEditTitle() {
        this.isEditingTitle = true;
        this.rerender();
        setTimeout(() => {
            const input = this.element.querySelector('.list-card__title-input');
            if (input) {
                input.focus();
                input.select();
            }
        }, 0);
    }

    /**
     * Сохраняет новый заголовок списка.
     */
    saveTitle() {
        const input = this.element.querySelector('.list-card__title-input');
        if (input) {
            const newTitle = input.value.trim();
            if (newTitle && newTitle !== this.title) {
                this.title = newTitle;
                if (this.onRename) this.onRename(this.listData.id, newTitle);
            }
        }
        this.isEditingTitle = false;
        this.rerender();
    }

    /**
     * Отменяет редактирование заголовка списка.
     */
    cancelEditTitle() {
        this.isEditingTitle = false;
        this.rerender();
    }

    /**
     * Перерисовывает компонент.
     */
    rerender() {
        const oldElement = this.element;
        const newElement = this.render();
        if (oldElement.parentNode) {
            oldElement.parentNode.replaceChild(newElement, oldElement);
        }
    }

    /**
     * Показывает модальное окно с подтверждением удаления списка.
     */
    showDeleteConfirmation() {
        const modal = new Modal({
            title: 'Удаление списка',
            text: `Вы точно хотите удалить список "${this.title}"?`,
            buttons: [
                { text: 'Нет', onClick: () => modal.close(), type: 'danger' },
                { text: 'Да', onClick: () => { 
                    if (this.onDelete) this.onDelete(this.listData.id);
                    modal.close();
                    this.element.remove();
                }, type: 'success' }
            ]
        });
        modal.show();
    }

    /**
     * Добавляет новую задачу в список.
     */
    addNewTask() {
        const tempId = `temp-${Date.now()}`; // временный локальный ID
        const newTask = { id: null, content: '', isCompleted: false, _isNew: true };
        this.tasks.push(newTask);
        this.renderTasks();

        // сразу начинаем редактирование
        setTimeout(() => {
            const tasksContainer = this.element.querySelector('.list-card__tasks');
            const lastTaskCard = tasksContainer.lastElementChild;
            if (lastTaskCard) {
                const editBtn = lastTaskCard.querySelector('.task-card__edit img');
                if (editBtn) editBtn.click();
            }
        }, 0);
    }

    /**     
     * Удаляет задачу из списка.
     * @param {string} taskId - ID задачи для удаления.
     */
    removeTask(taskId) {
        if (taskId === null) {
            this.tasks = this.tasks.filter(t => t.id); // удаляем только те без id
        } else {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            if (this.onDeleteTask) {
                console.log(taskId)
                this.onDeleteTask(this.listData.id, taskId);
            }
        }
        this.renderTasks();
    }
}