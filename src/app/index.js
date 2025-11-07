import { Router } from './router.js';
import './style.scss';
import * as AuthHandlers from '../features/auth/model/AuthHandlers.js';
import * as BoardsHandlers from '../features/boards/model/BoardsHandlers.js';
import * as ProfileHandlers from '../features/profile/model/ProfileHandlers.js';

import * as BoardHandlers from '../features/board/model/BoardHandlers.js';
import * as ListsHandlers from '../features/lists/model/ListsHandlers.js';
import * as TasksHandlers from '../features/tasks/model/TasksHandlers.js';

const router = new Router();
/**
 * Загружает страницу в зависимости от маршрута.
 */
async function loadPage() {
    const path = window.location.pathname;
    const appElement = document.getElementById('app');

    try {
        switch (path) {
            case '/': {
                const userData = await AuthHandlers.handleCurrentUser();
                if (userData) {
                    router.navigate('/boards');
                    return loadPage();
                } else {
                    router.navigate('/login');
                    return loadPage();
                }
            }
            case '/login': {
                const { LoginPage } = await import('../pages/login/ui/LoginPage.js');
                const loginPage = new LoginPage(
                    handleLoginAndRedirect,
                    () => router.navigate('/register')
                );
                document.body.className = 'page--login';
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
                document.body.className = 'page--register';
                appElement.innerHTML = '';
                appElement.appendChild(registerPage.render());
                break;
            }

            case '/profile': {
                const [userData, boardsData] = await Promise.all([
                    AuthHandlers.handleCurrentUser(),
                    BoardsHandlers.handleGetBoards()
                ]);

                if (!userData || !boardsData) {
                    router.navigate('/login');
                    return;
                }
                const { ProfilePage } = await import('../pages/profile/ui/ProfilePage.js');
                const profilePage = new ProfilePage(
                    userData,
                    () => router.navigate('/profile/edit'),
                    handleLogoutAndRedirect,
                    (path) => router.navigate(path)
                );
                document.body.className = 'page--profile';
                appElement.innerHTML = '';
                appElement.appendChild(profilePage.render());
                break;
            }
            case '/profile/edit': {
                const [userData, boardsData] = await Promise.all([
                    AuthHandlers.handleCurrentUser(),
                    BoardsHandlers.handleGetBoards()
                ]);

                if (!userData || !boardsData) {
                    router.navigate('/login');
                    return;
                }
                const { EditProfilePage } = await import('../pages/edit_profile/ui/EditProfilePage.js');
                const editProfilePage = new EditProfilePage(
                    userData,
                    handleProfileChange,
                    () => router.navigate('/profile/change-password'),
                    handleLogoutAndRedirect,
                    (path) => router.navigate(path)
                );
                document.body.className = 'page--edit-profile';
                appElement.innerHTML = '';
                appElement.appendChild(editProfilePage.render());
                break;
            }
            case '/profile/change-password': {
                const [userData, boardsData] = await Promise.all([
                    AuthHandlers.handleCurrentUser(),
                    BoardsHandlers.handleGetBoards()
                ]);

                if (!userData || !boardsData) {
                    router.navigate('/login');
                    return;
                }
                const { EditPasswordPage } = await import('../pages/edit_profile/ui/EditPasswordPage.js');
                const editPasswordPage = new EditPasswordPage(
                    userData,
                    handleChangePassword,
                    () => router.navigate('/profile/edit'),
                    handleLogoutAndRedirect,
                    (path) => router.navigate(path)
                );
                document.body.className = 'page--edit-password';
                appElement.innerHTML = '';
                appElement.appendChild(editPasswordPage.render());
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
                    console.log(boardsData)
                    const boardsPage = new BoardsListPage(
                        userData,
                        boardsData.active_boards || [],
                        boardsData.archived_boards || [],
                        handleLogoutAndRedirect,
                        (boardId) => router.navigate(`/board/${boardId}`),
                        (boardId) => handleActionWithReload(BoardsHandlers.handleRestoreBoard(boardId)),
                        (boardId) => handleActionWithReload(BoardsHandlers.handleDeleteBoard(boardId)),
                        (boardName) => handleActionWithReload(BoardsHandlers.handleCreateBoard(boardName)),
                        (path) => router.navigate(path)
                    );
                    document.body.className = 'page--boards';
                    appElement.innerHTML = '';
                    appElement.appendChild(boardsPage.render());
                } catch (error) {
                    console.error('Error loading boards:', error);
                    router.navigate('/login');
                }
                break;
            }
            case path.match(/^\/board\/[^/]+/)?.[0]:
            case path.match(/^\/board\/[^/]+\/task\/[^/]+/)?.[0]: {
                const { BoardPage } = await import('../pages/board/ui/BoardPage.js');
                const { boardId, taskId } = router.parseParams(path);

                const [userData, boardData] = await Promise.all([
                    AuthHandlers.handleCurrentUser(),
                    BoardHandlers.handleGetBoard(boardId)
                ]);

                if (!userData || !boardData) {
                    router.navigate('/login');
                    return;
                }

                const boardPage = new BoardPage(boardData, userData, {
                    onLogout: handleLogoutAndRedirect,
                    onAddList: (boardId, newList) => handleAddListWithSync(boardId, newList),
                    onRenameList: ListsHandlers.handleRenameList,
                    onDeleteList: ListsHandlers.handleDeleteList,
                    onAddTask: (boardId, listId, newTask) => handleAddTaskWithSync(boardId, listId, newTask),
                    onUpdateTask: TasksHandlers.handleUpdateTask,
                    onRenameBoard: BoardHandlers.handleRenameBoard,
                    onCloseBoard: BoardHandlers.handleCloseBoard,
                    onNavigate: (path) => router.navigate(path)
                });

                document.body.className = 'page--board';
                appElement.innerHTML = '';
                appElement.appendChild(boardPage.render());
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

async function handleChangePassword(data) {
    const errorMessage = await ProfileHandlers.handleUpdatePassword(data);
    return errorMessage;
}

async function handleProfileChange(data) {
    const errorMessage = await ProfileHandlers.handleUpdateProfile(data);
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

async function handleAddListWithSync(boardId, newList) {
    const created = await ListsHandlers.handleCreateList(boardId, newList.title);
    if (created && created.id) {
        console.log(`Список создан на сервере: ${created.id}`);
        return created;
    } else {
        console.warn('Ошибка при создании списка, останется локально');
        return null;
    }
}

async function handleAddTaskWithSync(boardId, listId, newTask) {
    const created = await TasksHandlers.handleCreateTask(boardId, listId, newTask.title);
    if (created && created.id) {
        console.log(`Задача синхронизирована: ${created.id}`);
        return created;
    } else {
        console.warn('Ошибка при создании задачи, оффлайн режим');
        return null;
    }
}


// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    loadPage();
    window.addEventListener('popstate', loadPage);
});