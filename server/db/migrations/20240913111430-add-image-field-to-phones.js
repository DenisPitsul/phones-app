'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('phones', 'image', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('phones', 'image');
  },
};
