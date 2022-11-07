const path = require('path');
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const db = require('./utils/dbconnection');
const userModel = require("./models/user");
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/",  (req, res) => {
    res.render('index',{username : req.session.username});
});

app.get("/register",(req,res)=>{
    res.render('register');
});

app.post("/create_user",(req,res)=>{
    const user = new userModel(req.body);

    user.save().then((result) => {
        res.redirect('/');
    }, (error) => {
        res.status(501).send(error)
    })
});

app.get("/login",(req,res)=>{
    res.render('login');
});

app.post("/auth_user",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    userModel.findOne({username : username , password : password }).then((result) => {
        if(!result) res.status(201).send("Invalid Passsword/Username");
        else{
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
        }
    }, (error) => {
        res.status(501).send(error)
    })
});


app.get('*', (req, res) => {
    res.render('404');
})

app.listen(port, () => console.log(`App successfully started on port ${port}`));