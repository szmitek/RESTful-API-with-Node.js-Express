// An array to store our users and their posts
const users = [
    {
        id: '1',
        name: 'Me',
        posts: [
            { id: '1', title: 'Post 1', description: 'Description 1' },
            { id: '2', title: 'Post 2', description: 'Description 2' },
        ],
    },
    {
        id: '2',
        name: 'Test',
        posts: [
            { id: '3', title: 'Post 3', description: 'Description 3' },
            { id: '4', title: 'Post 4', description: 'Description 4' },
        ],
    },
    {
        id: '3',
        name: 'Bob',
        posts: [
            { id: '5', title: 'Post 5', description: 'Description 5' },
            { id: '6', title: 'Post 6', description: 'Description 6' },
        ],
    },
];

module.exports = users;
