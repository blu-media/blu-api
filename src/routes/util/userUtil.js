/* DB Models */
const { db } = require('../../db/connection');

const createUser = (request, response) => {
  db.users.create(request.body)
    .then((user) => {
      response.json(user);
    })
    .catch((error) => {
      console.log(error)
    });
}

const getAllUsers = (request, response) => {
  db.users.findAll({
    include: [
      {
        model: db.organizations
      },
      {
        model: db.events
      }
    ]
  })
    .then((users) => {
      response.json(users);
    });
}

const getUserRSVPs = (request, response) => {
  db.users.findAll({
    include: [
      {
        model: db.organizations
      }
    ]
  }).then((users) => {
    response.json(users);
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserRSVPs
}
