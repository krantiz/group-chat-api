"use strict";
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("admin123", 10); // Hash the password

    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        isAdmin: true,
      },
      {
        name: "NormalUser",
        email: "normaluser@example.com",
        password: hashedPassword,
        isAdmin: false,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
