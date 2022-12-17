const express = require("express")
const app = express();
const homeController = require('../controllers/homeController');
const userController = require("../controllers/userController");

app.use( express.json() );

app
    .route('/')
    .get(homeController.homePage)

app
    .route('/users')
    .post(userController.createUser)
    .get(userController.getUser)

app
    .route('/users/:id')
    .put(userController.putUser)

const PORT = process.env.PORT || 8080
app.listen(
    PORT,
    () => console.log(`Listening on port ${PORT}`)
)
