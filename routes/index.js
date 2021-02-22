const express = require('express');
const router = express.Router();
const check = require('./checkAuthentication/check');

const db = require('../db/db');
const users = db.users;

router.get("/", check.checkAuthenticated, (req, res) => {
    res.render('../public/views/index.ejs', { name: req.user.name});
})

module.exports = router;