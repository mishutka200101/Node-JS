const express = require('express');
const http = require('http');
const cors = require('cors');
const prompt = require('prompt-sync')();
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

//TEST
app.all('/test', (req, res, next) => {
    res.status(200).json({ message: "OK"});

    next();
});

//SUM of 2 numbers
// app.use('/sum', (req, res, next) => {
//     let x1 = parseInt(prompt("Enter 1st number: "));
//     let x2 = parseInt(prompt("Enter 2nd number: "));

//     const sum = x1 + x2;

//     res.status(200).json({ sum });

//     console.log(sum);

//     next();
// });

app.post('/sum', (req, res, next) => {
    let body = req.body;
    let sum = body['x1'] + body['x2'];

    res.status(200).json({ sum });

    console.log(sum);

    next();
});

//reverseCase of string
app.use('/reverseCase', (req, res, next) => {
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

//reverseArray of string
app.use('/reverseArray', (req, res, next) => {
    let string = req.body['string'];
    let result = string.toString().split('').reverse().join('');

    res.status(200).json({ result });

    console.log(result);
    
    next();
});

//4th task of 1st practice


//Creating http server on port 3000
http.createServer(app).listen(3000, () => {
    console.log("Server is working on port 3000");
});