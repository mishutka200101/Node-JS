const Sequelize = require('sequelize');
const { sequelize } = require('..');

class ToDo extends Sequelize.Model { }

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.DataTypes.STRING
        },
        isCompleted: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'todo' }
);

module.exports = ToDo;