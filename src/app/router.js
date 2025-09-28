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
            '/boards': 'BoardsListPage'
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
}