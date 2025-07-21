const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieparser = require('cookie-parser');





const app = express();
dotenv.config({path:'./.env'});


const publicdirectory = path.join(__dirname,'public');
app.use(express.static(publicdirectory));

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser());


app.set('view engine','ejs');


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

})

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected to database');
    }})

app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'))
    
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

