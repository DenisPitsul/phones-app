'use strict';
const { Model } = require('sequelize');
const { ORDER_STATUSES } = require('../../constants');
module.exports = (sequelize, DataTypes) => {
  class Preorder extends Model {
    static associate (models) {
      Preorder.belongsTo(models.Phone, {
        foreignKey: {
          name: 'phoneId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Preorder.init(
    {
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
        },
      },
      status: {
        type: DataTypes.ENUM(...ORDER_STATUSES),
        defaultValue: ORDER_STATUSES[0],
        validate: {
          isIn: [...ORDER_STATUSES],
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          isInt: true,
          min: 1,
          max: 100,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\+380\d{9}$|^0\d{9}$/,
        },
      },
    },
    {
      sequelize,
      modelName: 'Preorder',
      underscored: true,
    }
  );
  return Preorder;
};
