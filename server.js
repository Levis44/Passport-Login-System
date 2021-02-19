const express = require('express'); 
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')

const users = []


app.set('view-engine', 'ejs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 

// ROUTES

app.get("/", (req, res) => {
    res.render('index.ejs');
})

app.get("/login", (req, res) => {
    res.render('login.ejs');
})

app.post("/login", (req, res) => {
    
})

app.get("/register", (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
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

app.listen(3000, () => {
    console.log("Server Rodando...");
})