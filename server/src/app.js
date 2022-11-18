//Initialize express
const express = require('express');
const app = express();

// Form Data
app.use(express.urlencoded({ extended: true }));

// JSON
app.use(express.json());

// CORS for all requests
const cors = require('cors');
app.use(cors());

//  Request Logging
const morgan = require('morgan');
app.use(morgan('combined'));

//Enable Additional Security
const helmet = require('helmet');
app.use(helmet());

//Setup Session Storage
const store_session = require('./utils/store_session');
app.use(store_session);


//other required modules
const path = require('path');
const flash = require('connect-flash');

app.use(flash());


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

//custom middlewares
const auth = require('./middlewares/auth');



//Setup Routes
const userRouter = require('./routers/users');
const blogRouter = require('./routers/blogs');
const messageRouter = require('./routers/messages');
const postModel = require("./models/posts");
const userModel = require("./models/users");
const {ObjectId} = require("mongodb");


app.use(userRouter);
app.use(blogRouter);
app.use(messageRouter);

app.get("/",  async (req, res) => {
        res.render('index', {session: req.session, msg: req.flash('msg')});
});

app.get('*', (req, res) => {
    res.render('404',{session : req.session});
})



port = process.env.PORT || 5000
app.listen(port , () => console.log(`App successfully started on port ${port}`));
