'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manufactured_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ram: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cpu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      screen_size: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      has_nfc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'brands',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
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

    await queryInterface.addConstraint('phones', {
      fields: ['model'],
      type: 'check',
      where: {
        model: {
          [Sequelize.Op.ne]: '',
        },
      },
    });

    await queryInterface.addConstraint('phones', {
      fields: ['manufactured_year'],
      type: 'check',
      where: {
        manufactured_year: {
          [Sequelize.Op.lte]: Sequelize.literal(
            'EXTRACT(YEAR FROM CURRENT_DATE)'
          ),
        },
      },
    });

    await queryInterface.addConstraint('phones', {
      fields: ['ram'],
      type: 'check',
      where: {
        ram: {
          [Sequelize.Op.gt]: 0,
        },
      },
    });

    await queryInterface.addConstraint('phones', {
      fields: ['cpu'],
      type: 'check',
      where: {
        cpu: {
          [Sequelize.Op.ne]: '',
        },
      },
    });

    await queryInterface.addConstraint('phones', {
      fields: ['screen_size'],
      type: 'check',
      where: {
        screen_size: {
          [Sequelize.Op.gt]: 0,
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('phones');
  },
};
