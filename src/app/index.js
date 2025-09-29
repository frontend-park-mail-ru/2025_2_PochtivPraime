import { Router } from './router.js';
import { mockBoards } from './config/api.js';
const API_BASE = 'http://89.208.208.203:8080';

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
                        fetch(`${API_BASE}/api/auth/me`),
                        fetch(`${API_BASE}/api/boards`)
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



/**
 * Обработка входа пользователя.
 * @param {Object} loginData - { email: string, password: string }
 */
async function handleLogin(loginData) {
    try {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            router.navigate('/boards');
            loadPage();
            return null;
        } else {
            const error = await response.json();
            return error.message || 'Ошибка входа';;
        }
    } catch (error) {
        console.error('Login error:', error);
        return 'Ошибка сети во время входа';
    }
}

/**
 * Обработка регистрации пользователя.
 * @param {Object} registerData - данные регистрации
 */
async function handleRegister(registerData) {
    try {
        const response = await fetch(`${API_BASE}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (response.ok) {
            router.navigate('/boards');
            loadPage();
            return null;
        } else {
            const error = await response.json();
            return error.message || 'Ошибка регистрации';
        }
    } catch (error) {
        console.error('Registration error:', error);
        return 'Ошибка сети во время регистрации';
    }
}

/*
 * Выход пользователя.
 */
async function handleLogout() {
    try {
        await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST' });
        router.navigate('/login');
        loadPage();
    } catch (error) {
        console.error('Logout error:', error);
        router.navigate('/login');
        loadPage();
    }
}

/**
 * Восстановление архивной доски.
 * @param {string} boardId - ID доски
 */
async function handleRestoreBoard(boardId) {
    try {
        const response = await fetch(`${API_BASE}/api/boards/${boardId}/restore`, { 
            method: 'POST' 
        });

        if (response.ok) {
            loadPage();
        } else {
            console.error('Failed to restore board');
        }
    } catch (error) {
        console.error('Restore board error:', error);
    }
}

/**
 * Удаление доски.
 * @param {string} boardId - ID доски
 */
async function handleDeleteBoard(boardId) {
    try {
        const response = await fetch(`${API_BASE}/api/boards/${boardId}`, { 
            method: 'DELETE' 
        });

        if (response.ok) {
            loadPage();
        } else {
            console.error('Failed DELETE');
        }
    } catch (error) {
        console.error('Delete board error:', error);
    }
}

/**
 * Создание новой доски.
 * @param {string} boardName - название доски
 */
async function handleCreateBoard(boardName) {
    try {
        const response = await fetch(`${API_BASE}/api/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: boardName }),
        });

        if (response.ok) {
            loadPage();
        } else {
            console.error('Failed CREATE');
        }
    } catch (error) {
        console.error('Create board error:', error);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    loadPage();
    window.addEventListener('popstate', loadPage);
});