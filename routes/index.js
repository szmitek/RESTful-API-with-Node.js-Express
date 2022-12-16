const app = require('express')();
const homeController = require('../controllers/homeController');


app.route('/').get(homeController.homePage)

const PORT = process.env.PORT || 8080
app.listen(
    PORT,
    () => console.log(`Listening on port ${PORT}`)
)
