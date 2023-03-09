'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dentist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dentist.hasMany(models.Appointment)
    }
  }
  Dentist.init({
    name: DataTypes.STRING,
    specialty: DataTypes.STRING,
    clinic: DataTypes.STRING,
    day: DataTypes.STRING,
    timeStart: DataTypes.DATE,
    timeEnd: DataTypes.DATE,
    experienceYear: DataTypes.STRING,
    dailyPatient: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dentist',
  });
  return Dentist;
};