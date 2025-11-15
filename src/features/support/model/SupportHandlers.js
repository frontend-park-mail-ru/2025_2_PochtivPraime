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

// export async function handleGetMyForms() {
//   return [
//     {
//       id: '1',
//       username: 'user',
//       email: 'user@example.com',
//       category: 'bug',
//       description: 'Тестовое обращение',
//       createdAt: '2025-11-15T10:00:00Z',
//       status: 'open'
//     },
//     {
//       id: '2',
//       username: 'user',
//       email: 'user@example.com',
//       category: 'feature',
//       description: 'Хочу тёмную тему',
//       createdAt: '2025-11-14T15:30:00Z',
//       status: 'in_progress'
//     },
//     {
//       id: '3',
//       username: 'user',
//       email: 'user@example.com',
//       category: 'other',
//       description: 'Спасибо за помощь!',
//       createdAt: '2025-11-10T09:15:00Z',
//       status: 'closed'
//     }
//   ];
// }

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