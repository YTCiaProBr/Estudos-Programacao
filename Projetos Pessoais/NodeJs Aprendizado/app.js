const express = require('express');
const dotenv = require('dotenv');
const hbs = require('hbs');
const path = require('path');
const db = require('./db.js');

const app = express();
const PORT = 5000;

dotenv.config({path: './.env'});

hbs.registerPartials(path.join(__dirname, '/views/partials/'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicDir = path.join(__dirname, '/public')
app.use(express.static(publicDir));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
