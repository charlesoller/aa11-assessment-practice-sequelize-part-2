'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.belongsTo(
        models.Sport,
        { foreignKey: 'sportId' }
      )

      Team.hasMany(
        models.Player,
        { foreignKey: 'currentTeamId', as: "TeamRoster" },
      )
    }
  }
  Team.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    homeCity: {
      type: DataTypes.STRING,
    },
    sportId: {
      type: DataTypes.INTEGER,
      references: { model: 'Sports', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
