'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate (models) {
      Phone.belongsTo(models.Brand, {
        foreignKey: 'brandId',
      });
      Phone.hasMany(models.Preorder, {
        foreignKey: {
          name: 'phoneId',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Phone.init(
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      manufacturedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1970,
          max: new Date().getFullYear(),
        },
      },
      ram: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      cpu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      screenSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.1,
        },
      },
      hasNfc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Phone',
      underscored: true,
    }
  );
  return Phone;
};
