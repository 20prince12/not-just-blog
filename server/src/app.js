//Initialize express
const express = require('express');
const app = express();

//Connect db
require('./utils/dbconnection');

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




//custom middlewares
const auth = require('./middlewares/auth');



//Setup Routes
const userRouter = require('./routers/users');
const blogRouter = require('./routers/blogs');
const messageRouter = require('./routers/messages');
app.use(userRouter);
app.use(blogRouter);
app.use(messageRouter);



app.get("/",  async (req, res) => {
        res.status(200).send({msg:'Server up and running'});
});


port = process.env.PORT || 5000
app.listen(port , () => console.log(`App successfully started on port ${port}`));
