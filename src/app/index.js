import { Router } from './router.js';
import { CookieManager } from './config/cookies.js';
import { mockUser, mockBoards } from './config/api.js';

const router = new Router();

/**
 * Проверяет, авторизован ли пользователь.
 * @returns {boolean} true, если пользователь авторизован
 */
function isAuthenticated() {
    return CookieManager.get('isLoggedIn') === 'true';
}

/**
 * Сохраняет данные пользователя в cookies.
 * @param {Object} userData - данные пользователя
 */
function setAuthData(userData) {
    CookieManager.set('isLoggedIn', 'true');
    CookieManager.set('userData', JSON.stringify(userData));
}

/**
 * Очищает данные авторизации.
 */
function clearAuthData() {
    CookieManager.delete('isLoggedIn');
    CookieManager.delete('userData');
}

/**
 * Получает данные текущего пользователя из cookies.
 * @returns {Object|null} данные пользователя или null, если нет данных
 */
function getUserData() {
    const data = CookieManager.get('userData');
    return data ? JSON.parse(data) : null;
}

/**
 * Получает активные доски пользователя.
 * @returns {Array<Object>} список активных досок
 */
function getActiveBoards() {
    const userData = getUserData();
    if (!userData) return [];
    return mockBoards.filter(board => board.ownerId === userData.id && !board.archived);
}

/**
 * Получает архивные доски пользователя.
 * @returns {Array<Object>} список архивных досок
 */
function getArchivedBoards() {
    const userData = getUserData();
    if (!userData) return [];
    return mockBoards.filter(board => board.ownerId === userData.id && board.archived);
}

/**
 * Загружает страницу в зависимости от маршрута.
 */
async function loadPage() {
    const path = window.location.pathname;
    const appElement = document.getElementById('app');

    try {
        // защищённый маршрут
        if (path === '/boards' && !isAuthenticated()) {
            router.navigate('/login');
            return loadPage();
        }

        // если авторизован - редирект на boards
        if ((path === '/' || path === '/login' || path === '/register') && isAuthenticated()) {
            router.navigate('/boards');
            return loadPage();
        }

        switch (path) {
            case '/':
            case '/login': {
                const { LoginPage } = await import('../pages/login/ui/LoginPage.js');
                const loginPage = new LoginPage(
                    (data) => handleLogin(data),
                    () => router.navigate('/register')
                );
                appElement.innerHTML = '';
                appElement.appendChild(loginPage.render());
                break;
            }

            case '/register': {
                const { RegisterPage } = await import('../pages/register/ui/RegisterPage.js');
                const registerPage = new RegisterPage(
                    (data) => handleRegister(data),
                    () => router.navigate('/login')
                );
                appElement.innerHTML = '';
                appElement.appendChild(registerPage.render());
                break;
            }

            case '/boards': {
                const { BoardsListPage } = await import('../pages/boards_list/ui/BoardsListPage.js');
                const userData = getUserData();
                const activeBoards = getActiveBoards();
                const archivedBoards = getArchivedBoards();

                const boardsPage = new BoardsListPage(
                    userData,
                    activeBoards,
                    archivedBoards,
                    () => handleLogout(),
                    (boardId) => handleRestoreBoard(boardId),
                    (boardId) => handleDeleteBoard(boardId),
                    (boardName) => handleCreateBoard(boardName)
                );
                appElement.innerHTML = '';
                appElement.appendChild(boardsPage.render());
                break;
            }

            default:
                router.navigate('/login');
                return loadPage();
        }
    } catch (err) {
        console.error('Ошибка при загрузке страницы:', err);
        appElement.innerHTML = `<div class="error">Ошибка загрузки: ${err.message}</div>`;
    }
}

/**
 * Обработка входа пользователя.
 * @param {Object} loginData - данные логина
 */
function handleLogin(loginData) {
    console.log('Login data:', loginData);

    // TODO: заменить на реальный API вызов
    setAuthData(mockUser);

    router.navigate('/boards');
    loadPage();
}

/**
 * Обработка регистрации пользователя.
 * @param {Object} registerData - данные регистрации
 */
function handleRegister(registerData) {
    console.log('Register data:', registerData);

    // TODO: заменить на реальный API вызов
    setAuthData({
        ...mockUser,
        name: registerData.name,
        email: registerData.email
    });

    router.navigate('/boards');
    loadPage();
}

/**
 * Выход пользователя.
 */
function handleLogout() {
    clearAuthData();
    router.navigate('/login');
    loadPage();
}

/**
 * Восстановление архивной доски.
 * @param {string} boardId - ID доски
 */
function handleRestoreBoard(boardId) {
    console.log('Restore board:', boardId);

    const boardIndex = mockBoards.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
        mockBoards[boardIndex].archived = false;
        console.log('Board restored:', mockBoards[boardIndex]);
    }
    loadPage();
}

/**
 * Удаление доски.
 * @param {string} boardId - ID доски
 */
function handleDeleteBoard(boardId) {
    console.log('Delete board:', boardId);

    const boardIndex = mockBoards.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
        const deletedBoard = mockBoards.splice(boardIndex, 1)[0];
        console.log('Board deleted:', deletedBoard);
    }
    loadPage();
}

/**
 * Создание новой доски.
 * @param {string} boardName - название доски
 */
function handleCreateBoard(boardName) {
    console.log('Create new board:', boardName);

    const userData = getUserData();
    if (!userData) return console.error('Ошибка создания. Пользователь не найден.');

    const newBoard = {
        id: 'board_' + Date.now(),
        ownerId: userData.id,
        title: boardName,
        image: '/images/default-board-bg.jpg',
        archived: false,
        createdAt: new Date().toISOString()
    };

    mockBoards.push(newBoard);
    loadPage();
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    loadPage();
    window.addEventListener('popstate', loadPage);
});