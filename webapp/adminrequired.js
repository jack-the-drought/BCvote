var zzzz = function(req, res, next) {
  console.log('admin middleware called with req.session.user eq ', req.session.user);
    if (req.session.user=="admin")
        return next();

    res.send('You must be an admin to perform this action');
};
module.exports = zzzz
