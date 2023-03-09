'use strict';
const uuid = require('uuid')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    medicalRecord: DataTypes.UUID,
    birthDate: DataTypes.DATE,
    UserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Profile',
  });
  Profile.beforeCreate(data => {
    data.medicalRecord = uuid.v4()
  })
  return Profile;
};