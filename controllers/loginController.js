require('dotenv').config();

const express = require('express')

const db = require('../utils/db')

const jwt = require('jsonwebtoken')
const tokenMiddleware = require('../utils/middlewareAuth')
const http = require('http');

var router = express.Router()

router.post('/login', async (req, res) => {

    //Authenticate Id/Pwd from Database
    console.log(req.body.pwd)
    const userFound = await db.db.collection('userInfo').findOne({ email: req.body.email, pwd: req.body.pwd })

console.log(userFound)
    if (userFound == null) return res.send({ msg: "Email/Pwd is not correct.", status: 'F' })

    const userObj = { userid: req.body.name };
    const token = jwt.sign(userObj, process.env.ACCESS_TOKEN, {
        expiresIn: "30m",
    })

    res.json({ accesstoken: token, status: 'S' })

})
module.exports = router;