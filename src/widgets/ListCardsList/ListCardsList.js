import template from './ListCardsList.precompiled.js';
import './ListCardsList.scss';
import { ListCard } from '../../entities/List/ui/ListCard/ListCard.js';

/**
 * Класс компонента — список всех колонок (списков задач) доски.
 * Имеет фон-картинку и кнопку добавления нового списка.
 * Использует precompiled Handlebars-шаблон.
 */
export class ListCardsList {
    /**
     * @param {Object} boardData - данные доски
     * @param {string} boardData.id - ID доски
     * @param {string} boardData.backgroundImage - URL фона доски
     * @param {Array} boardData.lists - массив списков (объекты {id, title, tasks})
     * @param {function} onAddList - обработчик добавления нового списка
     * @param {function} onRenameList - обработчик переименования списка
     * @param {function} onDeleteList - обработчик удаления списка
     * @param {function} onAddTask - обработчик добавления задачи
     * @param {function} onUpdateTask - обработчик обновления задачи
     */
    constructor(boardData, onAddList, onRenameList, onDeleteList, onAddTask, onUpdateTask) {
        this.boardData = boardData;
        this.onAddList = onAddList;
        this.onRenameList = onRenameList;
        this.onDeleteList = onDeleteList;
        this.onAddTask = onAddTask;
        this.onUpdateTask = onUpdateTask;
        
        this.lists = boardData.lists || [];
        this.backgroundImage = boardData.backgroundImage || '/images/default-board-bg.jpg';
    }

    /**
     * Рендер компонента
     * @returns {HTMLElement} - корневой элемент компонента
     */
    render() {
        const html = template({
            id: this.boardData.id,
            backgroundImage: this.backgroundImage
        });

        const div = document.createElement('div');
        div.innerHTML = html;
        this.element = div.firstElementChild;

        this.bindEvents();
        this.renderLists();

        return this.element;
    }

    /**
     * Навешивание событий на элементы компонента
     */
    bindEvents() {
        const addBtn = this.element.querySelector('.list-cards-list__add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addNewList();
            });
        }
    }

    /**
     * Рендер всех списков внутри компонента
     */
    renderLists() {
        const listsContainer = this.element.querySelector('.list-cards-list__container');
        if (!listsContainer) return;

        listsContainer.innerHTML = ''; // очищаем старые списки

        // рендер всех списков
        this.lists.forEach(list => {
            const listCard = new ListCard(
                list,
                (listId, newTitle) => {
                    if (this.onRenameList) this.onRenameList(this.boardData.id, listId, newTitle);
                    const index = this.lists.findIndex(l => l.id === listId);
                    if (index !== -1) this.lists[index].title = newTitle;
                    this.rerender();
                },
                (listId) => {
                    if (this.onDeleteList) this.onDeleteList(this.boardData.id, listId);
                    this.lists = this.lists.filter(l => l.id !== listId);
                    this.rerender();
                },
                (listId, newTask) => {
                    if (this.onAddTask) this.onAddTask(this.boardData.id, listId, newTask);
                },
                (listId, taskId, newTitle, isCompleted, action) => {
                    if (this.onUpdateTask) this.onUpdateTask(this.boardData.id, listId, taskId, newTitle, isCompleted, action);
                    const listIndex = this.lists.findIndex(l => l.id === listId);
                    if (listIndex !== -1) {
                        const taskIndex = this.lists[listIndex].tasks.findIndex(t => t.id === taskId);
                        if (taskIndex !== -1) {
                            if (newTitle !== undefined && newTitle !== null) this.lists[listIndex].tasks[taskIndex].title = newTitle;
                            if (isCompleted !== undefined) this.lists[listIndex].tasks[taskIndex].isCompleted = isCompleted;
                            if (action === 'delete') this.lists[listIndex].tasks.splice(taskIndex, 1);
                        }
                    }
                    this.rerender();
                }
            );
            listsContainer.appendChild(listCard.render());
        });

        // Добавляем кнопку в конец
        const addColumnDiv = document.createElement('div');
        addColumnDiv.className = 'list-cards-list__add-column';
        const addBtn = document.createElement('button');
        addBtn.className = 'list-cards-list__add-btn';
        addBtn.type = 'button';
        addBtn.textContent = 'Добавить список +';
        addColumnDiv.appendChild(addBtn);
        listsContainer.appendChild(addColumnDiv);

        // Навешиваем событие на кнопку
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addNewList();
        });
    }

    /**
     * Добавление нового списка
     */
    addNewList() {
        const newList = { title: 'Новый список', tasks: [] };

        if (this.onAddList) {
            const created = this.onAddList(this.boardData.id, newList);
            if (created && created.id) newList.id = created.id; // присвоение ID от сервера
            this.lists.push(newList);
            this.rerender();
        }

        // Прокрутка к новому списку
        setTimeout(() => {
            const listsContainer = this.element.querySelector('#lists-container');
            if (listsContainer) {
                listsContainer.scrollLeft = listsContainer.scrollWidth;
            }
        }, 0);
    }

    updateListId(tempId, newId) {
        const list = this.lists.find(l => l.id === tempId);
        if (list) {
            list.id = newId;
            this.rerender();
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
    }
}