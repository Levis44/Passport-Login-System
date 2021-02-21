const express = require('express');
const passport = require('passport');
const router = express.Router();
const check = require('./checkAuthentication/check');

router.get("/", check.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
})

router.post("/", check.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;