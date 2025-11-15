/**
 * Класс клиентского роутера
 */
export class Router {
    /**
     * Объект маршрутов, связывающий пути с названиями страниц
     * @type {Object.<string, string>}
     */
    constructor() {
        this.routes = {
            '/': 'LoginPage',
            '/login': 'LoginPage',
            '/register': 'RegisterPage', 
            '/boards': 'BoardsListPage',
            '/profile': 'ProfilePage',
            '/profile/edit': 'EditProfilePage',
            '/profile/change-password': 'EditPasswordPage',
            '/board/:boardId': 'BoardPage',
            '/board/:boardId/task/:taskId': 'TaskWindow',
            '/support': 'SupportFormPage'
        };
    }
    
    /**
     * Инициализация роутера. Обработчик кликов по ссылкам
     * @returns {void}
     */
    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });
    }
    
    /**
     * Выполняет переход по указанному пути. Изменяет url в адресной строке без перезагрузки страницы
     * Вызывает событие для обновления страницы
     * @param {string} path - путь на страницу
     * @returns {void}
     */
    navigate(path) {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    /**
     * Метод для извлечения параметров (boardId, taskId) из текущего пути
     * @param {string} [path=window.location.pathname] - путь для парсинга
     * @returns {{boardId: string|null, taskId: string|null}} - объект с параметрами
     */
    parseParams(path = window.location.pathname) {
        const boardMatch = path.match(/\/board\/([^/]+)/);
        const taskMatch = path.match(/\/task\/([^/]+)/);
        return {
            boardId: boardMatch ? boardMatch[1] : null,
            taskId: taskMatch ? taskMatch[1] : null,
        };
    }
}