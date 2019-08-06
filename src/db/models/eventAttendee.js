module.exports = (sequelize, type) => {
  const EventAttendee = sequelize.define("event_attendee", {},
    {
      tableName: "event_attendee"
    }
  );

  return EventAttendee;
};
