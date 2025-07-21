const express = require('express');
const router = express.Router();
const authcont = require('../controller/auth')

router.post('/register',authcont.register )
router.post('/login',authcont.login)
router.get('/logout',authcont.logout)



module.exports = router;