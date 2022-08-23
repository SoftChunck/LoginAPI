const express = require('express');
const mongoose = require('mongoose')
const UserModel = require('./Model/users')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

let SignedUser = {};


const dbURI = 'mongodb+srv://usama:0000@cluster0.x1phja1.mongodb.net/SignInUp?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result)=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log(err);
    })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.json({usernmae:'Usama',password:'abc'}))
app.post('/signin',(req,res)=>{
    console.log(req.body)
    UserModel.find({email: req.body.email , password : req.body.password})
    .then(result => {        
        if(result.length == 0)
        {
            res.status(400).send()
        }
        else{  
            SignedUser = result;       
            res.status(200).send()
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(200).send(err);
    })
})
app.post('/signup',(req,res)=>{
    UserModel.find({email:req.body.email})
    .then(result => {        
        console.log(result)
        if(result.length == 0)
        {
            UserModel.insertMany(req.body)
            .then(result => {        
                res.status(200).send('Account Created')
            })
            .catch( error => {
                res.status(400).send('Some Error')
            })
        }
        else{
            console.log('Account Already Exist With this Email')            
            res.status(200).send('Account Already Exist With this Email')
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(200).send(err);
    })
   
})
app.listen(process.env.PORT || 5000)