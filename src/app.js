//Initialize express
const express = require('express');
const app = express();

//Enable CORS , JSON , Form Data
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Setup Session
const session = require('express-session');
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));


//utility modules
const path = require('path');


//Setup Static Directory
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//Setup HBS Directory
const hbs = require('hbs');
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')

//Connect db
require('./utils/dbconnection');

//Setup Routes
const userRouter = require('./routers/users');
const blogRouter = require('./routers/blogs');

app.use(userRouter);
app.use(blogRouter);


app.get('*', (req, res) => {
    res.render('404',{session : req.session});
})


port = process.env.PORT || 5000
app.listen(port , () => console.log(`App successfully started on port ${port}`));