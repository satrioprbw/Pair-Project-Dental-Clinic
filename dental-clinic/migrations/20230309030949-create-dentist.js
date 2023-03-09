'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dentists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      specialty: {
        type: Sequelize.STRING
      },
      clinic: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING
      },
      timeStart: {
        type: Sequelize.DATE
      },
      timeEnd: {
        type: Sequelize.DATE
      },
      experienceYear: {
        type: Sequelize.STRING
      },
      dailyPatient: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Dentists');
  }
};