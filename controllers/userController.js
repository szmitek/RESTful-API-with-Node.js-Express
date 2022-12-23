const { db } = require('../config');

// create a user
exports.createUser = (req, res) => {
    // validate the request body
    if (!req.body.userName) {
        // return a 400 if the userName field is missing or empty
        res.status(400).send('Invalid input: userName field is required!');
        return;
    }

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

// get a list of users
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

// get a specific user
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

// update a user
exports.updateUser = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.id);

    // update the data for the user
    userRef.update({
        userName: req.body.userName,
    })
        .then(() => {
            // return the updated user data
            userRef.get()
                .then((doc) => {
                    if (doc.exists) {
                        res.send(doc.data());
                    } else {
                        res.status(404).send('User not found');
                    }
                });
        })
        .catch((error) => {
            // handle any errors
            console.error(error);
            res.status(500).send('Something went wrong!');
        });
};

// delete a user
exports.deleteUser = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.id);

    // get the data for the user document
    userRef.get()
        .then((doc) => {
            if (doc.exists) {
                // delete the user
                userRef.delete()
                    .then(() => {
                        // return a 204 to indicate that the delete was successful
                        res.status(204).send('User deleted');
                    })
                    .catch((error) => {
                        // handle any errors
                        console.error(error);
                        res.status(500).send('Something went wrong!');
                    });
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
