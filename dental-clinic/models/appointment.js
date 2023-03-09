'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.Dentist)
      Appointment.belongsTo(models.User)
      // define association here
    }
  }
  Appointment.init({
    appointmentStatus: DataTypes.STRING,
    treatment: DataTypes.STRING,
    schedule: DataTypes.DATE,
    price: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    DentistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  Appointment.beforeCreate(data => {
    data.appointmentStatus = 'Scheduled'
    if(data.specialty == 'General Dentist'){
      data.price = 100000
    } else {
      data.price = 200000
    }
  })
  return Appointment;
};