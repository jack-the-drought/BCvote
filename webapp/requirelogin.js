var zzzz = function(req, res, next) {
console.log('hehe');
    if (req.session.user)
        return next();

    res.redirect('/login');
};
module.exports = zzzz
