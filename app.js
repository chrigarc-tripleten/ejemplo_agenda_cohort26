const express = require('express');
const routerAddress = require('./routes/address.js');
const routerUsers= require('./routes/users.js');
const routerAuth = require('./routes/auth.js')
const authMiddleware = require('./middlewares/auth.js')
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/cohort26');

const app = express();

app.use(express.json()); // para parsear application/json
app.use(express.urlencoded({ extended: true })); 


app.use(routerAuth);

app.use(authMiddleware);

app.use(routerAddress);
app.use(routerUsers);

app.use('', (req, res) => {
    res.status(404).send({message: 'NOT FOUND'})
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log('server running')
})