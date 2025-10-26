import { AuthApi } from '../api/AuthApi.js';

export async function handleLogin(data) {
    try {
        await AuthApi.login(data);
    } catch (err) {
        console.error('Login error:', err);
        return err.message || 'Ошибка входа';
    }
}

export async function handleRegister(data) {
    try {
        await AuthApi.register(data);
    } catch (err) {
        console.error('Register error:', err);
        return err.message || 'Ошибка регистрации';
    }
}

export async function handleLogout() {
    try {
        await AuthApi.logout();
    } catch (err) {
        console.error('Logout error:', err);
    }
}

export async function handleCurrentUser() {
    try {
        return await AuthApi.getCurrentUser();
    } catch (err) {
        console.error('Getting current user error:', err);
        return null;
    }
}