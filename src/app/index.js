import { Router } from './router.js';
import { mockBoards } from './config/api.js';

const router = new Router();

/**
 * Загружает страницу в зависимости от маршрута.
 */
async function loadPage() {
    const path = window.location.pathname;
    const appElement = document.getElementById('app');

    try {
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

                try {
                    const [userResponse, boardsResponse] = await Promise.all([
                        fetch('/api/auth/me'),
                        fetch('/api/boards')
                    ]);

                    if (!userResponse.ok || !boardsResponse.ok) {
                        // Если не авторизован - редирект на логин
                        router.navigate('/login');
                        return;
                    }

                    const userData = await userResponse.json();
                    const boardsData = await boardsResponse.json();

                    const boardsPage = new BoardsListPage(
                        userData,
                        boardsData.activeBoards || [],
                        boardsData.archivedBoards || [],
                        () => handleLogout(),
                        (boardId) => handleRestoreBoard(boardId),
                        (boardId) => handleDeleteBoard(boardId),
                        (boardName) => handleCreateBoard(boardName)
                    );
                        appElement.innerHTML = '';
                        appElement.appendChild(boardsPage.render());
                    } catch (error) {
                        console.error('Error loading boards:', error);
                        router.navigate('/login');
                    }
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

//требуется переделать на работу с бэкэнд
// /**
//  * Обработка входа пользователя.
//  * @param {Object} loginData - данные логина
//  */
// function handleLogin(loginData) {
//     console.log('Login data:', loginData);

//     // TODO: заменить на реальный API вызов
//     setAuthData(mockUser);

//     router.navigate('/boards');
//     loadPage();
// }

// /**
//  * Обработка регистрации пользователя.
//  * @param {Object} registerData - данные регистрации
//  */
// function handleRegister(registerData) {
//     console.log('Register data:', registerData);

//     // TODO: заменить на реальный API вызов
//     setAuthData({
//         ...mockUser,
//         name: registerData.name,
//         email: registerData.email
//     });

//     router.navigate('/boards');
//     loadPage();
// }

// /**
//  * Выход пользователя.
//  */
// function handleLogout() {
//     clearAuthData();
//     router.navigate('/login');
//     loadPage();
// }

// /**
//  * Восстановление архивной доски.
//  * @param {string} boardId - ID доски
//  */
// function handleRestoreBoard(boardId) {
//     console.log('Restore board:', boardId);

//     const boardIndex = mockBoards.findIndex(board => board.id === boardId);
//     if (boardIndex !== -1) {
//         mockBoards[boardIndex].archived = false;
//         console.log('Board restored:', mockBoards[boardIndex]);
//     }
//     loadPage();
// }

// /**
//  * Удаление доски.
//  * @param {string} boardId - ID доски
//  */
// function handleDeleteBoard(boardId) {
//     console.log('Delete board:', boardId);

//     const boardIndex = mockBoards.findIndex(board => board.id === boardId);
//     if (boardIndex !== -1) {
//         const deletedBoard = mockBoards.splice(boardIndex, 1)[0];
//         console.log('Board deleted:', deletedBoard);
//     }
//     loadPage();
// }

// /**
//  * Создание новой доски.
//  * @param {string} boardName - название доски
//  */
// function handleCreateBoard(boardName) {
//     console.log('Create new board:', boardName);

//     const userData = getUserData();
//     if (!userData) return console.error('Ошибка создания. Пользователь не найден.');

//     const newBoard = {
//         id: 'board_' + Date.now(),
//         ownerId: userData.id,
//         title: boardName,
//         image: '/images/default-board-bg.jpg',
//         archived: false,
//         createdAt: new Date().toISOString()
//     };

//     mockBoards.push(newBoard);
//     loadPage();
// }

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    loadPage();
    window.addEventListener('popstate', loadPage);
});