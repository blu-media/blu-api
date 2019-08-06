module.exports = (sequelize, type) => {
  const OrganizationMember = sequelize.define('organization_member', {
    position: {
      type: type.STRING,
      allowNull: false
    }
  }, {
      tableName: 'organization_members'
    })

  return OrganizationMember;
}
