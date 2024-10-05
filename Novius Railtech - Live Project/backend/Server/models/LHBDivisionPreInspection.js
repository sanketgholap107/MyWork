const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Import your Sequelize instance

const LHBDivisionPreInspection = sequelize.define('LHBDivisionPreInspection', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    SectionId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DepartmentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    WheeltypeId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    WheelNo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    LooryNo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    POHDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    // returndate: {
    //     type: DataTypes.DATEONLY,
    //     allowNull: true
    // },
    divisionreport: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    matungareport: {
        type: DataTypes.STRING(50),
        allowNull: true
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
    tableName: 'LHBDivisionPreInspection',
    timestamps: false // To manage createdDate and modifiedDate manually
});

module.exports = LHBDivisionPreInspection;
