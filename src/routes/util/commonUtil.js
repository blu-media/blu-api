/* DB Object */
const { db } = require("../../db/connection");

const getEventById = (eventId) => {
  return new Promise((resolve, reject) => {
    db.events.findByPk(eventId, {
      include: [
        {
          model: db.users,
          as: "rsvps"
        },
        {
          model: db.users,
          as: "attendees"
        },
        {
          model: db.organizations
        }
      ]
    }).then(event => {
      resolve(event);
    }).catch(error => {
      reject(error);
    });
  });
};

const getOrganizationById = (orgId) => {
  return new Promise((resolve, reject) => {
    db.organizations.findByPk(orgId, {
      include: [
        {
          model: db.users,
          as: 'members'
        },
        {
          model: db.events
        }
      ]
    }).then(org => {
      resolve(org);
    }).catch(error => {
      reject(error);
    });
  });
};

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    db.users.findByPk(userId, {
      include: [
        {
          model: db.organizations
        }
      ]
    }).then(user => {
      resolve(user);
    }).catch(error => {
      reject(error);
    });
  });
};



module.exports = {
  getEventById,
  getOrganizationById,
  getUserById
}
