/* NPM Installation Dependencies */
const express = require("express");
// const passport = require('passport');
// var GoogleTokenStrategy = require('passport-google-token').Strategy;
// var gCal = require('google-calendar');
// const path = require("path");

// Import authentication util.
const { generateToken, sendToken, findOrCreateUser } =
  require('../util/authUtil');

const router = express.Router();

/********** GOOGLE AUTHENTICATION **********/

// Need to add the following line soon:
// passport.authenticate('google-token')
router.route('/google')
  .post(async (request, response, next) => {
    console.log(request.body);
    request.session.accessToken = request.body.access_token;

    let user = await findOrCreateUser(request.body.profile);

    request.user = user.dataValues;

    next();
  }, generateToken, sendToken);

// passport.use(new GoogleTokenStrategy({
//   clientID: config.googleAuth.GOOGLE_CLIENT_ID,
//   clientSecret: config.googleAuth.GOOGLE_CLIENT_SECRET
// }, (accessToken, refreshToken, profile, done) => {
//   findOrCreateUser(profile._json, (error, user) => {
//     return done(error, user);
//   });
// }));

module.exports = router;
