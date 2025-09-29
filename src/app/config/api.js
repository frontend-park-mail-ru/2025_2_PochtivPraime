// тестовые данные пользователя
export const mockUser = {
    id: 1,
    name: 'Test User', 
    email: 'test@example.com',
    avatar: '/images/default-avatar.png' 
};

// тестовые данные для досок
export const mockBoards = [
    {
        id: 'board_1',
        ownerId: 1,
        title: 'Планы на год',
        image: '/images/default-board-bg.jpg',
        archived: false,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_2', 
        ownerId: 1,
        title: 'Рабочие задачи',
        image: '/images/default-board-bg.jpg',
        archived: false,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_3',
        ownerId: 1, 
        title: 'Личные цели',
        image: '/images/default-board-bg.jpg',
        archived: false,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_4',
        ownerId: 1,
        title: 'Проект А',
        image: '/images/default-board-bg.jpg',
        archived: false,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_5',
        ownerId: 1,
        title: 'Проект Б',
        image: '/images/default-board-bg.jpg',
        archived: false,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_6',
        ownerId: 1,
        title: 'Идеи',
        image: '/images/default-board-bg.jpg',
        archived: false,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_7',
        ownerId: 1,
        title: 'Завершенные проекты 2024',
        image: '/images/default-board-bg.jpg', 
        archived: true,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_8',
        ownerId: 1,
        title: 'Старые идеи',
        image: '/images/default-board-bg.jpg',
        archived: true,
        createdAt: new Date().toISOString()
    },
    {
        id: 'board_9',
        ownerId: 1,
        title: 'Архив 2023',
        image: '/images/default-board-bg.jpg',
        archived: true,
        createdAt: new Date().toISOString()
    }
];