module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Community', {
    communityname: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
};
