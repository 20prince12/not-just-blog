const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
require('dotenv').config();


const store = new MongoDBSession({
    uri : process.env.MONGO_URI,
    collection : 'sessions',
});

const store_session = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie:{maxAge:1000*60*24*30 /*ms*m*hr*days*/},
});

module.exports =  store_session ;