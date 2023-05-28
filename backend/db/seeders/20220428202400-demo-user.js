'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/demo.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'john@williams.com',
        username: 'John Williams',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/john.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'jordan@rakei.com',
        username: 'Jordan Rakei',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/jordanrakei.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'kings@convenience.com',
        username: 'Kings of Convenience',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/kings.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'lianne@havas.com',
        username: 'Lianne La Havas',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/lianne.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'louis@cole.com',
        username: 'Louis Cole',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/louiscole.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'mac@ayres.com',
        username: 'Mac Ayres',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/macayres.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'snoh@aalegra.com',
        username: 'Snoh Aalegra',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/snoh.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'doobie@brothers.com',
        username: 'The Doobie Brothers',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/doobie.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'tom@misch.com',
        username: 'Tom Misch',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/tom.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'paul@melhus.com',
        username: 'Paul Melhus',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/me.jpg",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'kiefer@kiefer.com',
        username: 'Kiefer',
        profileImageUrl: "https://tonezonesongs.s3.amazonaws.com/kiefer.jpeg",
        hashedPassword: bcrypt.hashSync('password')
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {});
  },
  order: 4

};
