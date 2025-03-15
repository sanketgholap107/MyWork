'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reminder', 'isRead', {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Default value is false (unread)
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reminder', 'isRead');
  },
};