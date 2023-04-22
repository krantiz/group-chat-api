# Group Chat APIs

This is a node + express + mysql based backend server

## Table of Contents

- [Installation](##installation)
- [Usage](##usage)
- [Improvements](##Improvements)


## Installation

* Clone the project from git.
* Run the command ` npm install ` to install all the dependencies.
* Create Database and add credentials in .env file of the project.
```
MYSQL_DB_USERNAME="root"
MYSQL_DB_PASSWORD="root"
MYSQL_DB_NAME="group_chat_db"
MYSQL_DB_HOST="127.0.0.1"
```
* Run the command ` npm start ` to start the node server.
* By default node server will listen to port 8080.
* If npm start is running properly you will see a message like `Synced db`. It means database schema has been created.
* Now, Run the command `npx sequelize db:seed:all`. This command will create 2 users in database.


## Usage

* To test the working of these APIs.
* Install `Rest Client` Visual studio plugin and open the file `restAPI.http`
* Now you can send this request and check the response and working.
* To check the test cases run the command `npm test`, It will run the test cases and give you the output.

## Improvements

* I have kept the implementation as simple as possible.
* Improvements in APIs
    - I can add API schema validator like Joi.
    - I can add params validators and null checks for each inputs.
    - I can add more checks how and who can add the messages or users in group.
* Improvements in e2e test cases
    - We can add more minor test cases as per the scenarios