import { ProfileApi } from '../api/ProfileApi.js';

/**
 * Обработка обновления профиля
 * @param {object} data - данные профиля для обновления
 * @return {string|undefined} - сообщение об ошибке или undefined при успешном обновлении
 */
export async function handleUpdateProfile(data) {
    try {
        await ProfileApi.updateProfile(data);
    } catch (err) {
        console.error('Update profile error:', err);
        return err.message || 'Ошибка обновления профиля';
    }
}

/**
 * Обработка смены пароля
 * @param {object} data - данные для смены пароля
 * @return {string|undefined} - сообщение об ошибке или undefined при успешной смене пароля
 */
export async function handleUpdatePassword(data) {
    try {
        await ProfileApi.updatePassword(data);
    } catch (err) {
        console.error('Update password error:', err);
        return err.message || 'Ошибка смены пароля';
    }
}