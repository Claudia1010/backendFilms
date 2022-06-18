'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Rental.belongsTo(models.Film, {
        foreignKey: 'filmId'
      });
    }
  }
  Rental.init({
    userId: DataTypes.UUID,
    filmId: DataTypes.UUID,
    totalPrice: DataTypes.INTEGER,
    returnDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rental',
  });
  return Rental;
};