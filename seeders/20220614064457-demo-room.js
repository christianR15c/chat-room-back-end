'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Rooms_id_seq" RESTART WITH 2;`
    );

    return queryInterface.bulkInsert('Rooms', [
      {
        id: 1,
        room_name: 'general',
        createdBy: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
