"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 2,
          title: "Main Title",
          description: "In a galaxy far, far away...",
          url: "https://tonezonesongs.s3.amazonaws.com/01+Main+Title.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/starwars.jpeg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 4,
          title: "Know How",
          description: "featuring Feist",
          url: "https://tonezonesongs.s3.amazonaws.com/05+Know+How.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/knowhow.jpeg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 5,
          title: "Sour Flower",
          description: "A sour flower, it's all me",
          url: "https://tonezonesongs.s3.amazonaws.com/11+Sour+Flower.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/sour.jpg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 6,
          title: "Real Life",
          description: "featuring Brad Mehldau",
          url: "https://tonezonesongs.s3.amazonaws.com/05+Real+Life+(feat.+Brad+Mehldau).m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/reallife.jpeg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 7,
          title: "Change Ya Mind",
          description: "Never tried to change ya",
          url: "https://tonezonesongs.s3.amazonaws.com/09+Change+Ya+Mind.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/change.jpg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 8,
          title: "Find Someone Like You",
          description: "I've been waitin' my whole life, to find someone like you",
          url: "https://tonezonesongs.s3.amazonaws.com/05+Find+Someone+Like+You.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/findsomeonelikeyou.jpg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 9,
          title: "What a Fool Believes",
          description: "Michael McDonald supremacy!!!",
          url: "https://tonezonesongs.s3.amazonaws.com/02+What+a+Fool+Believes+(2016+Remastered).m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/whatafool.jpeg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 10,
          title: "What Kinda Music",
          description: "with Yussef Dayes on the drums",
          url: "https://tonezonesongs.s3.amazonaws.com/01+What+Kinda+Music.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/What_Kinda_Music.jpg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 11,
          title: "Dreamscape",
          description: "song artwork by my dad and song composed by myself!",
          url: "https://tonezonesongs.s3.amazonaws.com/Dreamscape.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/Dreamscape.jpg",
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          userId: 12,
          title: "Cute",
          description: "was feelin' cute so i wrote this song...",
          url: "https://tonezonesongs.s3.amazonaws.com/04+Cute.m4a",
          imageUrl: "https://tonezonesongs.s3.amazonaws.com/cute.jpeg",
          createdAt: new Date,
          updatedAt: new Date
        },
      ],

      {}
    );
  },

  down: (queryInterface, Sequelize) => {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Songs', {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    // return queryInterface.bulkDelete("Songs", null, {});
  },
  order: 5,
};
