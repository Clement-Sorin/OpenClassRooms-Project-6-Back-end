NodeJS 	![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# Mon vieux Grimoire - Book community reviewing website

<img src="./frontend/src/images/main-page.png" alt="mon-vieux-grimoire homepage screenshot" width="800" />

## Description

Sixth project of the OpenClassrooms Web Developer course

## Technologies

- Node.js
- Express
- MongoDB 

## Libraries

- Bcrypt
- JSON Web Token
- Multer

## Goal 

Since the frontend code has already been developed, the developer will need to build the entire backend part of the Mon Vieux Grimoire application, a book rating site.

To do this, he will need to follow several steps:

1. Install and configure a Node server with Express.
2. Create a MongoDB database and link it to the server.
3. Set up GET routes for the API to fetch data from the database.
4. Implement POST routes for user authentication (sign in and login) using password hashing with Bcrypt and issuing a token with JSON Web Token.
5. Implement POST and PUT routes for adding and modifying new books, using Multer as the file handling library.
6. Add a POST route for users to submit ratings, ensuring all non-conformance conditions are handled (such as no duplicate ratings and preventing users from rating their own book).

## Author

Clément Sorin