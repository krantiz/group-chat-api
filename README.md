# Guruway Backend Server

This is a node + express + mysql + mongodb based backend server

## Table of Contents

- [Installation](##installation)
- [DataSeeder](##DataSeeder)
- [Usage](##usage)
- [Improvements](##Improvements)


## Installation

* Clone the project from git.
* Run the command ` npm install ` to install all the dependencies.
* Create Database and add them in .env file of the project. (Create mongoDB)
* Run the command ` npm start ` to start the node server.
* By default node server will listen to port 8080.

## DataSeeder

* Data into Mysql DB
    1. Add MYSQL database details in the file `.env`.
    2. Now, Check database connection is done or not by runing `npm start`
    3. If npm start is running properly you will see a message like `Synced db.`. It means database schema has been created.
    3. Now, Run the command `npx sequelize db:seed:all`. This command will put all the data into database.
* Data into MongoDB
    1. Add MongoDB details in the file `.env`.
    2. Now, Check database connection is done or not by runing `npm start`
    3. If npm start is running properly you will see a message like `Connected to MongoDB.`. It means database schema has been created.
    3. Now, Run the command `node excel-to-db.js`. This command will put all the data into database.

## Usage

* These APIs will be used to server the Guruway website frontend.
* This Project Follows MVC pattern.


## Improvements

* API Validator.