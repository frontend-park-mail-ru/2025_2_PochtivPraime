import { SupportApi } from '../api/SupportApi.js';

export async function handleCreateSupportForm(data) {
    try {
        await SupportApi.createForm(data);
        return null; // ошибки нет
    } catch (err) {
        console.error('Create form error:', err);
        return err?.message || 'Не удалось отправить обращение';
    }
}

export async function handleGetMyForms() {
    try {
        return await SupportApi.getMyForms();
    } catch (err) {
        console.error('My forms fetch error:', err);
        return null;
    }
}

export async function handleGetFormById(formId) {
    try {
        return await SupportApi.getFormById(formId);
    } catch (err) {
        console.error('Get form by id error:', err);
        return null;
    }
}

export async function handleDeleteForm(formId) {
    try {
        await SupportApi.deleteForm(formId);
        return true;
    } catch (err) {
        console.error('Delete form error:', err);
        return false;
    }
}

export async function handleGetAllForms() {
    try {
        return await SupportApi.getAllForms();
    } catch (err) {
        console.error('Get all forms error:', err);
        return null;
    }
}