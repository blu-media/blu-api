/* NPM Installation Dependencies */
const Sequelize = require("sequelize");

/* DB Model Schemas */
const UserModel = require("./models/user");
const OrganizationModel = require("./models/organization");
const EventModel = require("./models/event");
const EventRSVPModel = require("./models/eventRSVP");
const EventAttendeeModel = require("./models/eventAttendee");
const OrganizationMemberModel = require("./models/organizationMember");

/* Environment Configuration */
const config = require('../../config').getConfig(process.env.NODE_ENV);

/* Establish the DB Connection */
const sequelize = new Sequelize(config.database.DB_URL);

/* Connect all the models/tables in the database to a db object, 
   so everything is accessible via one object. */
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = UserModel(sequelize, Sequelize);
db.organizations = OrganizationModel(sequelize, Sequelize);
db.events = EventModel(sequelize, Sequelize);
db.eventRSVPs = EventRSVPModel(sequelize, Sequelize);
db.eventAttendees = EventAttendeeModel(sequelize, Sequelize);
db.organizationMembers = OrganizationMemberModel(sequelize, Sequelize);


/********** ASSOCIATIONS *****/

// Users (Members) --> Organizations
db.users.belongsToMany(db.organizations, {
  through: {
    model: "organization_member"
  }
});

// Organizations --> Users
db.organizations.belongsToMany(db.users, {
  as: "members",
  through: {
    model: "organization_member"
  }
});

// Organizations --> Events
db.organizations.belongsToMany(db.events, {
  through: "events_organizations"
});

// Events --> Organizations
db.events.belongsToMany(db.organizations, {
  through: "events_organizations"
});

// Events --> Users (Attendees)
db.events.belongsToMany(db.users, {
  as: "attendees",
  through: {
    model: "event_attendee"
  }
});

// Users --> Events
db.users.belongsToMany(db.events, {
  through: "event_attendee"
});

// Events --> Users (RSVP's)
db.events.belongsToMany(db.users, {
  as: "rsvps",
  through: {
    model: "event_rsvp"
  }
});

// Users --> Events
db.users.belongsToMany(db.events, {
  through: {
    model: "event_rsvp"
  }
});

/* Connect to the DB. */
sequelize
  .authenticate()
  .then(() => {
    db.sequelize.sync({ force: false }).then(() => {
      console.log("Database created successfully!");
    });

    console.log("Connection has been established successfully.");
  })
  .catch(error => {
    console.error("Unable to connect to the database.", error);
  });

module.exports = {
  db
};
