const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    modifiedBy: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    createdDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    modifiedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'User',
    timestamps: false // To manage createdDate and modifiedDate manually
});

module.exports = User;