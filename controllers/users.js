const UserModel = require('../models/users.js');
const { handleFailError, handleError } = require("../utils/handleErrors");

const getUsers = (req, res) => {
    UserModel.find({}).then(users => {
        res.send(users);
    }).catch(error => handleError(error, res));
}

const getUser = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
    .orFail(handleFailError)
    .then(user => {
        res.send(user);
    }).catch(error => handleError(error, res));
} 

const createUser = (req, res) => {
    const {name, about, avatar} = req.body;
    UserModel.create({name, about, avatar}).then(user => {
        res.send(user);
    }).catch(error => handleError(error, res));
}


module.exports = {getUser, getUsers, createUser}