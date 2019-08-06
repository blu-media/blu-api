/* NPM Installation Dependencies */
const uniqid = require("uniqid");
const jwt = require('jsonwebtoken');

/* Import DB Object */
const { db } = require('../../db/connection');

// const findOrCreateUser = (profile, callback) => {
//   console.log(profile);
//   return db.users.findOne({ where: { email: profile.email } })
//     .then((error, user) => {
//       if (user) return callback(error, user);
//       else {
//         let userProfile = {
//           email: profile.email,
//           firstName: profile.given_name,
//           id: uniqid(),
//           lastName: profile.family_name,
//           profilePicture: profile.picture
//         }

//         db.users.create(userProfile)
//           .then((error, user) => {
//             console.log("RECEIVING USER");
//             return callback(error, user);
//           });
//       }
//     });
// }

const findOrCreateUser = (profile) => {
  return new Promise((resolve, reject) => {
    db.users.findOne({ where: { email: profile.email } })
      .then((user) => {
        if (user) {
          resolve(user);
        }
        else {
          let userProfile = {
            email: profile.email,
            firstName: profile.givenName,
            id: uniqid(),
            lastName: profile.familyName,
            profilePicture: profile.imageUrl
          }

          db.users.create(userProfile)
            .then((user) => {
              resolve(user);
            });
        }
      });
  });
}

const generateToken = (request, response, next) => {
  const token = jwt.sign(request.user, 'my-secret');
  request.token = token;

  return next();
}

const sendToken = (request, response) => {
  response.setHeader('x-auth-token', request.token);
  return response.status(200).send(JSON.stringify(request.user));
}

module.exports = {
  findOrCreateUser,
  generateToken,
  sendToken
}
