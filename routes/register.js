const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const check = require('./checkAuthentication/check');

const db = require('../db/db');
const users = db.users;

router.get("/", check.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
})

router.post('/', check.checkNotAuthenticated, async (req, res) => {

    let userPassword = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        console.log(hashedPassword);
        
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    console.log(users);
})

module.exports = router;