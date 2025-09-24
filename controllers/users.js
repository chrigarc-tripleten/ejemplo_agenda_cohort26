require('dotenv').config()
const UserModel = require('../models/users.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleFailError, handleError } = require("../utils/handleErrors");

const SECRET_WORD = process.env.SECRET_WORD;

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

const register = (req, res) => {
    const {email, password} = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    UserModel.create({email, password: hashPassword}).then((user) => {
        res.send({
            status: true,
            email: user.email
        })
    }).catch(error => handleError(error, res));
}

const login = (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({
        email
    }).select('+password').orFail(handleFailError).then(user => {
        if(bcryptjs.compareSync(password, user.password)){
            const token = jwt.sign({ _id: user._id}, SECRET_WORD, { expiresIn: '2h' });
            res.send({token})
        }else{
            res.status(400).send({
                status: false, 
                message: 'Invalid credentials'
            })
        }
    }).catch(error => handleError(error, res));
}

const me = (req, res) => {
    const _id = req.user._id;
    UserModel.findById(_id).then(user=>{
        res.send(user);
    }).catch(error => handleError(error, res));
}

module.exports = {getUser, getUsers, createUser, register, login,me}