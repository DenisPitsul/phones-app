'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'brands',
      [
        {
          name: 'Apple',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          name: 'Samsung',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  },
};
