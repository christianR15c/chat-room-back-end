'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Users_id_seq" RESTART WITH 3;`
    );
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Christian',
        email: 'christian@gmail.com',
        password: bcrypt.hashSync(
          '123456',
          Number.parseInt(process.env.SALT_ROUNDS, 10)
        ),
        isAdmin: true,
        image:
          'https://res.cloudinary.com/dmgfxu4fg/image/upload/v1654073043/profile-icon_prev_ui_d7vthy.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Habineza',
        email: 'habineza@gmail.com',
        password: bcrypt.hashSync(
          '123456',
          Number.parseInt(process.env.SALT_ROUNDS, 10)
        ),
        image:
          'https://res.cloudinary.com/dmgfxu4fg/image/upload/v1654073043/profile-icon_prev_ui_d7vthy.png',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    // updating user id to be autoincrement after inserting seed data
  },
  // upadating id to be auto-incrementing

  async down(queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
