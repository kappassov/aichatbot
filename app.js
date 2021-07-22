const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv')
const app = express();
const dialogflow = require("@google-cloud/dialogflow")
dotenv.config({path: "./config/config.env"});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(
        `Server is running on ${process.env.NODE_ENV} at port: ${process.env.PORT}`.yellow.bold
    )
);

