const uuidv4 = require('uuid/v4');  // For generating unique IDs

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

exports.createUser = (req, res) => {
    const user = {
        id: uuidv4(),  // Generate a unique ID
        name: req.body.name,
        posts: [],
    };
    users.push(user);
    res.status(201).json(user);
};

exports.getUsers = (req, res) => {
    res.status(200).json(users);
};

exports.getUser = (req, res) => {
    const user = users.find((x) => x.id === req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
};

exports.updateUser = (req, res) => {
    const user = users.find((x) => x.id === req.params.id);
    if (user) {
        user.name = req.body.name;
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
};

exports.deleteUser = (req, res) => {
    const user = users.find((x) => x.id === req.params.id);
    if (user) {
        const index = users.indexOf(user);
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
};
