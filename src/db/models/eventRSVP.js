module.exports = (sequelize, type) => {
  const EventRSVP = sequelize.define('event_rsvp', {
    response: {
      type: type.STRING,
      allowNull: false
    }
  }, {
      tableName: 'event_rsvps'
    })

  return EventRSVP;
}
