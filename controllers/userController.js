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
    // get a reference to the "users" collection
    const usersRef = db.collection('users');

    // get all documents in the collection
    usersRef.get()
        .then((snapshot) => {
            // build an array of users from the query snapshot
            const users = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            // return the array of users
            res.send(users);
        })
        .catch((error) => {
            // handle any errors
            console.error(error);
            res.status(500).send('Something went wrong!');
        });
};

exports.getUser = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.id);

    // get the data for the user
    userRef.get()
        .then((doc) => {
            if (doc.exists) {
                // return the user data
                res.send(doc.data());
            } else {
                // return a 404 if the user was not found
                res.status(404).send('User not found');
            }
        })
        .catch((error) => {
            // handle any errors
            console.error(error);
            res.status(500).send('Something went wrong!');
        });
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
