require('dotenv').config();

const express = require('express')

const db = require('../utils/db')

const jwt = require('jsonwebtoken')
const tokenMiddleware = require('../utils/middlewareAuth')



var router = express.Router()

router.post('/register', (req, res) => {

    //Authenticate Id/Pwd from Database
    console.log(req.body);
    const userObj = { firstName: req.body.firstname, lastName: req.body.lastname, email: req.body.email, pwd: req.body.password }
    if (userObj == null) return res.send("Please fill all the fields.")

    db.db.collection("userInfo").insertOne(userObj);
    res.statusMessage = "Registration Successful"
    return res.status(200).end()
})

module.exports = router;