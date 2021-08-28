module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profilepictureid: {
      type: DataTypes.TEXT,
      defaultValue: 'defaultpfp.svg',
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
