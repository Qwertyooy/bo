const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const jwt_secret = process.env.JWT;
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

})

exports.register = (req,res)=>{
   const {username,age,password,passwordconfrim} = req.body;


   db.query('SELECT name FROM users WHERE name = ?',[username],(error,result)=>{
    if(result.length > 0){
        return res.render('register',{
            message : "user already exists"
        })
    }else if(password.length < 8){
        return res.render('register',{
            message : "password must be 8 characters"
        })
    }else if(password !== passwordconfrim){
        return res.render('register',{
            message : "password do not macth"
        })
    }

    db.query('INSERT INTO users SET ? ', {name : username ,password : password  ,age : age }, (error,result) => {
        if(error){
            console.log(error)
        }else{ 
            console.log(result)
            return res.render('register',{
                message : "user registered"
            })
        }
    })
   })

};

exports.login = (req,res) => {
    console.log(req.body)
    const {usernameLog,passwordLog} = req.body;
    db.query('SELECT * FROM users WHERE name = ?',[usernameLog],(error,result)=>{
        if(error){
            console.log(error)
        }if(result.length === 0){
            console.log('user not found')
            return res.render('login',{
                message : "user not found please register"
            })
        }else if (result[0].password !== passwordLog){
            return res.render('login',{
                message : "invalid password"
            })
        }


    const token = jwt.sign({id : result[0].id},jwt_secret,{expiresIn : '90d'});
    res.cookie('token',token, {
        httpOnly : true,
        maxAge : 60*60*1000
    });

    const cookiesOption = {
        expires : new Date (
            Date.now() + 90*24*60*60*1000),
            httpOnly :true
    }

    res.cookie('token',token,cookiesOption)
    res.status(200).redirect('/dashboard')
    })
}

exports.islog = async (req,res,next) => {

    if (req.cookies.token){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.token,jwt_secret);
            db.query('SELECT * FROM users WHERE id = ?',[decoded.id],(error,result)=>{
                if(!result || result.length === 0){
                    return next();
                }
                req.user = result[0];
                return next();
            }) 
        }catch(error){
            return next();
        }
    }else{
        next();
    }
}

exports.logout = (req,res) => {
    res.clearCookie('token');
    res.status(200).redirect('/');
}
 
