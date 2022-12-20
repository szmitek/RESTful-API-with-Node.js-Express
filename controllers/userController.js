const uuidv4 = require('uuidv4');  // For generating unique IDs
const users = require('../data/users');

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
