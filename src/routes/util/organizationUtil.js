/* DB Models */
const { db } = require('../../db/connection');
const Op = db.Sequelize.Op;


/* Common Utility Functions */
const util = require("./commonUtil");

const addOrganizationMember = async (request, response) => {
  let org = await util.getOrganizationById(request.params.orgId);
  let user = await util.getUserById(request.body.userId);

  org.addMember(user, {
    through: {
      position: request.body.position
    }
  }).then((org) => {
    response.json(org);
  });
};

const createOrganization = (request, response) => {
  db.organizations.create(request.body)
    .then((org) => {
      response.json(org);
    })
    .catch((error) => {
      console.log(error)
    });
}

const deleteOrganization = (request, response) => {
  db.organizations.destroy({
    where: { id: request.params.orgId }
  }).then(() => {
    response.send("Organization has been deleted!");
  });
};

const getEventsByOrganization = (request, response) => {
  db.organizations.findByPk(request.params.orgId, {
    include: [
      {
        model: db.users,
        as: 'members'
      },
      {
        model: db.events
      }
    ]
  }).then((org) => {
    response.json(org.events);
  }).catch((error) => {
    console.log(error)
  });
}

const getAllOrganizations = (request, response) => {
  db.organizations.findAll({
    include: [
      {
        model: db.users,
        as: 'members'
      },
      {
        model: db.events
      }
    ]
  }).then((orgs) => {
    response.json(orgs);
  })
    .catch((error) => {
      console.log(error)
    });
}

const getOrganizationEventsInTimeFrame = (request, response) => {
  db.organizations.findByPk(request.params.orgId, {
    include: [
      {
        model: db.events,
        where: {
          startTime: {
            [Op.gte]: request.query.startTime || null,
            [Op.lte]: request.query.endTime || null
          }
        }
      }
    ]
  }).then(events => {
    response.send(events);
  });
};

const updateOrganization = (request, response) => {
  db.organizations.update(request.body, {
    where: { id: request.params.orgId },
    returning: true,
    plain: true
  }).then((org) => {
    response.send(org[1]);
  });
};

module.exports = {
  addOrganizationMember,
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getEventsByOrganization,
  updateOrganization,
  getOrganizationEventsInTimeFrame
}
