'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lagu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lagu.init({
    name: DataTypes.STRING,
    singer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lagu',
  });
  return Lagu;
};