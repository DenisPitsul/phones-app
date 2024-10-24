'use strict';

const { ORDER_STATUSES } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('preorders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      status: {
        type: Sequelize.ENUM(ORDER_STATUSES),
        defaultValue: ORDER_STATUSES[0],
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'phones',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('preorders', {
      fields: ['order_date'],
      type: 'check',
      where: {
        order_date: {
          [Sequelize.Op.lte]: Sequelize.fn('NOW'),
        },
      },
    });

    await queryInterface.addConstraint('preorders', {
      fields: ['quantity'],
      type: 'check',
      where: {
        quantity: {
          [Sequelize.Op.between]: [1, 100],
        },
      },
    });

    await queryInterface.addConstraint('preorders', {
      fields: ['phone_number'],
      type: 'check',
      where: {
        phone_number: {
          [Sequelize.Op.regexp]: '^\\+380\\d{9}$|^0\\d{9}$',
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('preorders');
  },
};
