const auth = (req , res , next) => {

    if(req.session.loggedin) {
        next();
    }
    else {
        req.flash('msg', 'Please login to access this feature.');
        res.redirect('/login');
    }
}

module.exports =auth;