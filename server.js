if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express'); 
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');
const index = require('./routes/index');
;

const app = express();

const db = require('./db/db');
const users = db.users;

const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.set('view-engine', 'ejs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// ROUTES
app.use('/', index)
app.use('/login', login)
app.use('/register', register)
app.use('/logout', logout)

app.listen(3000, () => {
    console.log("Server Rodando...");
})