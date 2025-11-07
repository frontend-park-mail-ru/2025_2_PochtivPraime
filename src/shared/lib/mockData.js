export const mockBoard = {
    id: 'board_1',
    title: 'Моя первая доска',
    backgroundImage: '/images/default-board-bg.jpg',
    lists: [
        {
            id: 'list-1',
            title: 'Сделать сегодня',
            tasks: [
                { id: 'task-1', title: 'Создать моки', isCompleted: true },
                { id: 'task-2', title: 'Проверить BoardPage', isCompleted: false }
            ]
        },
        {
            id: 'list-2',
            title: 'Планирую',
            tasks: [
                { id: 'task-3', title: 'Подключить бэкенд', isCompleted: false }
            ]
        }
    ]
};

export const mockUser = {
    id: 'user-1',
    username: 'dev_user',
    avatar: '/images/default-avatar.png'
};