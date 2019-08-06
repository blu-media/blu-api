module.exports = (sequelize, type) => {
  const Organization = sequelize.define('organization', {
    about: {
      type: type.TEXT,
      allowNull: false
    },
    acronym: {
      type: type.STRING,
      allowNull: false
    },
    contactInfo: type.JSONB,
    logo: {
      type: type.STRING,
      defaultValue: 'profile.jpg'
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    id: {
      type: type.STRING,
      primaryKey: true
    }
  });

  return Organization;
}
