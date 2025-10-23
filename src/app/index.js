import { Router } from './router.js';
import * as AuthHandlers from '../features/auth/model/AuthHandlers.js';
import * as BoardsHandlers from '../features/boards/model/BoardsHandlers.js';

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
                    handleLoginAndRedirect,
                    () => router.navigate('/register')
                );
                appElement.innerHTML = '';
                appElement.appendChild(loginPage.render());
                break;
            }

            case '/register': {
                const { RegisterPage } = await import('../pages/register/ui/RegisterPage.js');
                const registerPage = new RegisterPage(
                    handleRegisterAndRedirect,
                    () => router.navigate('/login')
                );
                appElement.innerHTML = '';
                appElement.appendChild(registerPage.render());
                break;
            }

            case '/boards': {
                const { BoardsListPage } = await import('../pages/boards_list/ui/BoardsListPage.js');

                try {
                    const [userData, boardsData] = await Promise.all([
                        AuthHandlers.handleCurrentUser(),
                        BoardsHandlers.handleGetBoards()
                    ]);

                    if (!userData || !boardsData) {
                        router.navigate('/login');
                        return;
                    }

                    const boardsPage = new BoardsListPage(
                        userData,
                        boardsData.activeBoards || [],
                        boardsData.archivedBoards || [],
                        handleLogoutAndRedirect,
                        (boardId) => handleActionWithReload(BoardsHandlers.handleRestoreBoard(boardId)),
                        (boardId) => handleActionWithReload(BoardsHandlers.handleDeleteBoard(boardId)),
                        (boardName) => handleActionWithReload(BoardsHandlers.handleCreateBoard(boardName))
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

async function handleLoginAndRedirect(data) {
    const errorMessage = await AuthHandlers.handleLogin(data);
    if (!errorMessage) {
        router.navigate('/boards');
    }
    return errorMessage;
}

async function handleRegisterAndRedirect(data) {
    const errorMessage = await AuthHandlers.handleRegister(data);
    if (!errorMessage) {
        router.navigate('/login');
    }
    return errorMessage;
}

async function handleLogoutAndRedirect() {
    const errorMessage = await AuthHandlers.handleLogout();
    if (!errorMessage) {
        router.navigate('/login');
    }
    return errorMessage;
}

async function handleActionWithReload(actionPromise) {
    try {
        await actionPromise;
        const currentPath = window.location.pathname;
        await loadPage(currentPath);
    } catch (error) {
        console.error('Action failed:', error);
    }
}


// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    loadPage();
    window.addEventListener('popstate', loadPage);
});