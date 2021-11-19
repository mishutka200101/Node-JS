const path = require('path');
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://smorchkov:25Zydfhz@localhost:5432/Node-JS', {
// });

const sequelize = new Sequelize({
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    database: 'Node-JS',
    username: 'smorchkov',
    password: '25Zydfhz',
  });

const initDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Sequelize was initialized');
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = {
    sequelize,
    initDB
};