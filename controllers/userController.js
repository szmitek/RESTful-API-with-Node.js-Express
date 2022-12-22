const users = require('../data/users');
const { db } = require('../config');

exports.createUser = (req, res) => {
    // create a new document in the "users" collection
    const userRef = db.collection('users').doc();

    // set the data for the new document
    const userData = {
        id: userRef.id,
        userName: req.body.userName,
    };

    // write the data to the database
    userRef.set(userData)
        .then(() => {
            // return the created user
            res.send(userData);
        })
        .catch((error) => {
            // handle any errors
            console.error(error);
            res.status(500).send('Something went wrong!');
        });
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
