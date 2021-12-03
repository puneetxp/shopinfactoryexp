const loginRoutes=require('./controllers/loginController')
const registerRoutes=require('./controllers/registerController')
const tokenMiddleware = require('./utils/middlewareAuth')
const http = require('http');
var express=require('express');
var app=express()
var server = http.Server(app)



app.use(express.json());

app.use('/',loginRoutes);
app.use('/',registerRoutes);

app.get('/', (req, res) => {
    res.send("Page Not Found");
})


server.listen(3000, () => {
    console.log('Server Started')
});


