const express = require('express');
const router = express.Router();
const authcont = require('../controller/auth')




router.get("/",(req,res)=>{
    res.render('index');
})

router.get("/list",(req,res)=>{
    res.render('list');
})

router.get("/register",(req,res)=>{
    res.render('register', { message: null });
})

router.get("/login",(req,res)=>{
    res.render('login');
})



router.get('/dashboard',authcont.islog,(req,res)=>{
    if (req.user){
        res.render('dashboard',{user : req.user})
    }else {
        res.redirect('/login')
    }
})


module.exports = router;