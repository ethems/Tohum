const passport = require('passport');

module.exports = passport.authenticate('local', {session: false});
