'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DraftPick extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DraftPick.init({
    fanId: {
      type: DataTypes.INTEGER,
      references: { model: 'Fans', key: 'id' },
      onDelete: 'cascade',
      hooks: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      references: { model: 'Players', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'DraftPick',
  });
  return DraftPick;
};
