/* NPM Installation Dependencies */
const qr = require("qrcode");
const uniqid = require("uniqid");
var gCal = require('google-calendar');

/* DB Object */
const { db } = require("../../db/connection");
const Op = db.Sequelize.Op;

/* Common Utility Functions */
const util = require("./commonUtil");

const config = require('../../../config').getConfig(process.env.NODE_ENV);

const addAttendee = async (request, response) => {
  let event = await util.getEventById(request.params.eventId);
  let user = await util.getUserById(request.body.userId);

  event.addAttendee(user).then(attendee => {
    response.json(attendee);
  });
};

const addEventToUserCalendar = (event, user, accessToken) => {
  let googleCalendar = new gCal.GoogleCalendar(accessToken);
  // console.log(googleCalendar);

  // console.log(event);

  // googleCalendar.events.insert('primary', {
  //   'summary': event.name,
  //   'location': event.location,
  //   'start': {
  //     'dateTime': event.startTime,
  //     'timeZone': 'America/Los_Angeles',
  //   },
  //   'end': {
  //     'dateTime': event.endTime,
  //     'timeZone': 'America/Los_Angeles',
  //   },
  //   'sendUpdates': true
  // }, (error, result) => {
  //   if (!error) {
  //     console.log(`Event created: ${result.htmlLink}`);
  //   } else {
  //     console.log(error);
  //   }
  // });
};

const addOrganizationToEvent = async (request, response) => {
  let event = await util.getEventById(request.params.eventId);
  let org = await util.getOrganizationById(request.body.orgId);

  event.addOrganization(org).then(org => {
    response.json(org);
  });
};

const addRSVP = async (request, response) => {
  let event = await util.getEventById(request.params.eventId);
  let user = await util.getUserById(request.body.userId);

  addEventToUserCalendar(event.dataValues, user.dataValues,
    request.session.accessToken);

  event
    .addRsvp(user, {
      through: {
        response: request.body.response
      }
    })
    .then(rsvp => {
      response.json(rsvp);
    });
};

const createEvent = (request, response) => {
  let eventId = uniqid();
  request.body.id = eventId;
  request.body.qrCode = createQRCode(eventId);

  db.events.create(request.body).then(event => {
    response.send(event);
  });
};

const createQRCode = (eventId) => {
  return new Promise((resolve, reject) => {
    qr.toDataURL(`${config.client.CLIENT_URL}/events/${eventId}`, (error, url) => {
      if (error) reject(error);

      resolve(url);
    });
  });
};

const deleteAttendee = async (request, response) => {
  let event = await util.getEventById(request.params.eventId);
  let user = await util.getUserById(request.params.userId);

  event.removeAttendee(user).then(() => {
    response.send("Attendee has been removed from event!");
  });
};

const deleteEventById = (request, response) => {
  db.events.destroy({
    where: { id: request.params.eventId }
  }).then(() => {
    response.send("Event has been deleted!");
  });
};

const deleteOrganizationFromEvent = async (request, response) => {
  let event = await util.getEventById(request.params.eventId);
  let org = await util.getOrganizationById(request.body.orgId);

  event.removeOrganization(org).then(() => {
    response.send("Organization has been removed from event!");
  });
};

const deleteRSVP = async (request, response) => {
  let event = await util.getEventById(request.params.eventId);
  let user = await util.getUserById(request.body.userId);

  event.removeRsvp(user).then(() => {
    response.send("RSVP has been removed from event!");
  });
};

const getAllEvents = (request, response) => {
  db.events
    .findAll({
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
    })
    .then(events => {
      response.json(events);
    });
};

const getAttendees = (request, response) => {
  db.events
    .findByPk(request.params.eventId, {
      include: [
        {
          model: db.users,
          as: "attendees"
        }
      ]
    })
    .then(event => {
      response.send(event.attendees);
    });
};

const getEventById = (request, response) => {
  db.events
    .findByPk(request.params.eventId, {
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
      response.json(event);
    });
};
const getEventsInTimeFrame = (request, response) => {
  db.events.findAll({
    where: {
      startTime: {
        [Op.gte]: request.query.startTime || null,
        [Op.lte]: request.query.endTime || null
      }
    }
  }).then(events => {
    response.send(events);
  });
};

const getRSVP = (request, response) => {
  db.eventRSVPs.findAll({
    where: {
      eventId: request.params.eventId,
      userId: request.params.userId
    }
  }).then(rsvp => {
    response.send(rsvp);
  });
};

const updateEventById = (request, response) => {
  db.events
    .update(request.body, {
      where: { id: request.params.eventId },
      returning: true,
      plain: true
    }
    )
    .then(event => {
      response.send(event[1]);
    });
};

const updateRSVP = (request, response) => {
  db.eventRSVPs.update(
    {
      response: request.body.response
    },
    {
      where: {
        eventId: request.params.eventId,
        userId: request.body.userId
      },
      returning: true,
      plain: true
    }).then(rsvp => {
      response.send(rsvp);
    });
};

module.exports = {
  addAttendee,
  addOrganizationToEvent,
  addRSVP,
  createQRCode,
  deleteAttendee,
  deleteOrganizationFromEvent,
  deleteRSVP,
  getAllEvents,
  getAttendees,
  getEventById,
  getRSVP,
  updateRSVP,
  createEvent,
  updateEventById,
  deleteEventById,
  getEventsInTimeFrame
};
