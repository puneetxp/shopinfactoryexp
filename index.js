require('dotenv').config();

const express = require('express')

const db = require('./utils/db')

const jwt = require('jsonwebtoken')
const tokenMiddleware = require('./utils/middlewareAuth')
const http = require('http');

var app = express();
var server = http.Server(app)



app.use(express.json());


app.get('/', (req, res) => {
    res.send("Page Visited");
})

app.post('/login', async (req, res) => {

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

app.post('/register', (req, res) => {

    //Authenticate Id/Pwd from Database
    console.log(req.body);
    const userObj = { firstName: req.body.firstname, lastName: req.body.lastname, email: req.body.email, pwd: req.body.password }
    if (userObj == null) return res.send("Please fill all the fields.")

    db.db.collection("userInfo").insertOne(userObj);
    res.statusMessage = "Registration Successful"
    return res.status(200).end()
})

app.get('/pageOne', tokenMiddleware, (req, res) => {
    res.send("Page Visited");
})

server.listen(3000, () => {
    console.log('Server Started')
});


