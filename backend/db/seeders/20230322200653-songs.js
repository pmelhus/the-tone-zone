"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 1,
          title: "MyTestyMent",
          description: "Feeling testy",
          url: "https://tonezonesongs.s3.amazonaws.com/1651517422248.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/1651512345675.jpeg",
          createdAt: new Date,
          updatedAt: new Date
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    // return queryInterface.bulkDelete("Songs", null, {});
  },
};
