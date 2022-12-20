const users = require('../data/users');

// exports.createPost = (req, res) => {
//     const post = {
//         id: users.posts.length + 1,
//         title: req.body.title,
//         description: req.body.description,
//     }
//     users.posts.push(users.posts);
//     res.send(post);
//     res.status(201).json(post);
// }

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
