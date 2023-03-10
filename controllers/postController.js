const { db } = require('../config');

// create a post for a user
exports.createPost = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.userId);

    // get the data for the user document
    userRef.get()
        .then((doc) => {
            if (doc.exists) {
                // get a reference to the "posts" subcollection of the user document
                const postsRef = userRef.collection('posts');

                // create a new document in the "posts" subcollection
                const postRef = postsRef.doc();

                // set the data for the new document
                const postData = {
                    id: postRef.id,
                    title: req.body.title,
                    description: req.body.description,
                };

                // write the data to the database
                postRef.set(postData)
                    .then(() => {
                        // return the created post
                        res.send(postData);
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

// get a list of posts for a user
exports.getPosts = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.userId);

    // get the data for the user document
    userRef.get()
        .then((doc) => {
            if (doc.exists) {
                // get a reference to the "posts" subcollection of the user document
                const postsRef = userRef.collection('posts');

                // get all documents in the subcollection
                postsRef.get()
                    .then((snapshot) => {
                        // build an array of posts from the query snapshot
                        const posts = snapshot.docs.map((doc) => {
                            return { id: doc.id, ...doc.data() };
                        });

                        // return the array of posts
                        res.send(posts);
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

// get a specific post for a user
exports.getPost = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.userId);

    // get the data for the user document
    userRef.get()
        .then((doc) => {
            if (doc.exists) {
                // get a reference to the specific post document
                const postRef = userRef.collection('posts').doc(req.params.postId);

                // get the data for the post
                postRef.get()
                    .then((postDoc) => {
                        if (postDoc.exists) {
                            // return the post data
                            res.send(postDoc.data());
                        } else {
                            // return a 404 if the post was not found
                            res.status(404).send('Post not found');
                        }
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

// update a post for a user
exports.updatePost = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.userId);

    // get the data for the user document
    userRef.get()
        .then((doc) => {
            if (doc.exists) {
                // get a reference to the specific post document
                const postRef = userRef.collection('posts').doc(req.params.postId);

                // update the data for the post
                postRef.update({
                    title: req.body.title,
                    description: req.body.description,
                })
                    .then(() => {
                        // return the updated post data
                        postRef.get()
                            .then((doc) => {
                                res.send(doc.data());
                            });
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

// delete a post for a user
exports.deletePost = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.userId);

    // get the data for the user document
    userRef.get()
        .then((doc) => {
            if (doc.exists) {
                // get a reference to the specific post document
                const postRef = userRef.collection('posts').doc(req.params.postId);

                // delete the post
                postRef.delete()
                    .then(() => {
                        // return a message indicating that the post was deleted
                        res.send('Post deleted');
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
