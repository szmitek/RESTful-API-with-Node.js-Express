//const uuid = require('uuid');  // For generating unique IDs
//const users = require('../data/users');
const { db } = require('../config');

exports.createPost = (req, res) => {
    // get a reference to the user document
    const userRef = db.collection('users').doc(req.params.userId);

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
};

exports.getPosts = (req, res) => {
    const user = users.find((x) => x.id === req.params.userId);
    if (user) {
        res.status(200).json(user.posts);
    } else {
        res.status(404).send('User not found');
    }
};

exports.getPost = (req, res) => {
    const user = users.find((x) => x.id === req.params.userId);
    if (user) {
        const post = user.posts.find((x) => x.id === req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } else {
        res.status(404).send('User not found');
    }
};

exports.updatePost = (req, res) => {
    const user = users.find((x) => x.id === req.params.userId);
    if (user) {
        const post = user.posts.find((x) => x.id === req.params.id);
        if (post) {
            post.title = req.body.title;
            post.description = req.body.description;
            res.status(200).json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } else {
        res.status(404).send('User not found');
    }
};

exports.deletePost = (req, res) => {
    const user = users.find((x) => x.id === req.params.userId);
    if (user) {
        const post = user.posts.find((x) => x.id === req.params.id);
        if (post) {
            const index = user.posts.indexOf(post);
            user.posts.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('Post not found');
        }
    } else {
        res.status(404).send('User not found');
    }
};
