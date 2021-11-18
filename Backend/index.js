const express = require('express');
const http = require('http');
const cors = require('cors');
const prompt = require('prompt-sync')();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://smorchkov:25Zydfhz@localhost:5432/Node-JS', {
    define: {
        freezeTableName: true
    }
});
const { parse } = require('path');
const { SlowBuffer } = require('buffer');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.originalUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('IsSecure = ', req.secure);
    console.log('BODY = ', req.body);
    console.log('QUERY = ', req.query);

    next();
});

// TEST
app.all('/test', (req, res, next) => {
    res.status(200).json({ message: "OK"});

    next();
});

// sum of 2 numbers

app.post('/sum', (req, res, next) => {
    let body = req.body;
    let sum = body['x1'] + body['x2'];

    res.status(200).json({ sum });

    console.log(sum);

    next();
});

// reverseCase of string
app.post('/reverseCase', (req, res, next) => {
    let string = req.body['string'];
    let stringArray = string.toString().split('');

    for (let i = 0; i < stringArray.length; i++) {
        stringArray[i] == stringArray[i].toUpperCase() ? stringArray[i] = stringArray[i].toLowerCase() : stringArray[i] = stringArray[i].toUpperCase();
    }

    let result = stringArray.join('');

    res.status(200).json({ result });

    console.log(result);

    next();
});

// reverseArray of string
app.post('/reverseArray', (req, res, next) => {
    let string = req.body['string'];
    let result = string.toString().split('').reverse().join('');

    res.status(200).json({ result });

    console.log(result);
    
    next();
});

// 4th task of 1st practice


// Creating http server on port 3000
http.createServer(app).listen(3000, () => {
    console.log("Server is working on port 3000");
});


//DB BLOCK-----------------------------------------------------------
const ToDo = sequelize.define('ToDo', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})