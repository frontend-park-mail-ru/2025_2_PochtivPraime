import { Router } from './router.js';

const router = new Router();

async function loadPage() {
    const path = window.location.pathname;
    const appElement = document.getElementById('app');
    
    switch (path) {
        case '/':
        case '/login':
            const { LoginPage } = await import('../pages/login/ui/LoginPage.js');
            const loginPage = new LoginPage(
                (data) => handleLogin(data),
                () => router.navigate('/register')
            );
            appElement.innerHTML = '';
            appElement.appendChild(loginPage.render());
            break;
            
        case '/register':
            const { RegisterPage } = await import('../pages/register/ui/RegisterPage.js');
            const registerPage = new RegisterPage(
                (data) => handleRegister(data),
                () => router.navigate('/login')
            );
            appElement.innerHTML = '';
            appElement.appendChild(registerPage.render());
            break;
            
        case '/boards':
            const { BoardsListPage } = await import('../pages/boards_list/ui/BoardsListPage.js');
            const boardsPage = new BoardsListPage();
            appElement.innerHTML = '';
            appElement.appendChild(boardsPage.render());
            break;
            
        default:
            router.navigate('/login');
    }
}


function handleLogin(loginData) {
    // вход
    router.navigate('/boards');
}

function handleRegister(registerData) {
    // регистрация
    router.navigate('/boards');
}

// при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    loadPage();
    window.addEventListener('popstate', loadPage);
});