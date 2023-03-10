const express = require("express")
const app = express();

const homeController = require('../controllers/homeController');
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

// Middleware to parse the body of the request as JSON
app.use(express.json());

// Home page
app.get('/', homeController.homePage)

// User routes
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUser);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Post routes
app.get('/users/:userId/posts', postController.getPosts);
app.get('/users/:userId/posts/:postId', postController.getPost);
app.post('/users/:userId/posts', postController.createPost);
app.put('/users/:userId/posts/:postId', postController.updatePost);
app.delete('/users/:userId/posts/:postId', postController.deletePost);

const PORT = process.env.PORT || 8080
app.listen(
    PORT,
    () => console.log(`Listening on port ${PORT}`)
)

