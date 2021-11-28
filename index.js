require('dotenv').config();

const express=require('express')

const jwt=require('jsonwebtoken')
const tokenMiddleware=require('./utils/middlewareAuth')
const http=require('http');

var app=express();
var server=http.Server(app)



app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Page Visited");
})

app.post('/login',(req,res)=>{

    //Authenticate Id/Pwd from Database
    
const userObj={userid:req.body.name};
const token=jwt.sign(userObj,process.env.ACCESS_TOKEN,{
    expiresIn: "30m",
  })

res.json({accesstoken:token})   

})

app.post('/register',(req,res)=>{

    //Authenticate Id/Pwd from Database
    
const userObj={userid:req.body.name};
const token=jwt.sign(userObj,process.env.ACCESS_TOKEN)

res.json({accesstoken:token})   

})

app.get('/pageOne',tokenMiddleware,(req,res)=>{
    res.send("Page Visited");
})

server.listen(3000,()=>{
console.log('Server Started')
});


