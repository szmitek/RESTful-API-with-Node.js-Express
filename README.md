# REST API
This is a REST API built using Node.js and Firebase. It provides CRUD functionality for users and posts.

## Getting Started
To get started with this project, you will need to have Node.js and Firebase installed on your system.

## Prerequisites
* Node.js
* Firebase
## Installing
1. Clone the repository to your local system
2. Navigate to the root directory of the project
3. Run npm install to install all required dependencies
4. Create a Firebase project and update the .env file with your Firebase credentials
5. Run npm start to start the API server
## API Endpoints
The following endpoints are available:

### Users
* GET /users - Retrieve a list of all users
* POST /users - Create a new user
* GET /users/:id - Retrieve a specific user
* PUT /users/:id - Update a specific user
* DELETE /users/:id - Delete a specific user
### Posts
* GET /users/:userId/posts - Retrieve a list of all posts for a specific user
* POST /users/:userId/posts - Create a new post for a specific user
* GET /users/:userId/posts/:postId - Retrieve a specific post for a specific user
* PUT /users/:userId/posts/:postId - Update a specific post for a specific user
* DELETE /users/:userId/posts/:postId - Delete a specific post for a specific user
## Built With
* Node.js - JavaScript runtime
* Firebase - Cloud-based database and backend service
