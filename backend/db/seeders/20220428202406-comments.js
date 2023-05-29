"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 2,
          songId: 1,
          body: "Pretty proud of this one!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 1,
          body: "iconic mr. williams... ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 1,
          body: "one of many greats!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 1,
          body: "iconic mr. williams... ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 2,
          body: "a nice pleasant song... nicely done!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 2,
          body: "i looooove feist's tone!! great song guys",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          songId: 2,
          body: "michael loves this one... you are literal KINGS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 3,
          body: "what a great jam!! gj lianne",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 3,
          body: "thx louis, love your music!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          songId: 3,
          body: "guuuuurl you're so good!!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          songId: 3,
          body: "what a great jam!! gj lianne",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          songId: 3,
          body: "trynna collab?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          songId: 4,
          body: "this song is bananas, in the best way",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          songId: 4,
          body: "love what these new kids are coming up with these days",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 4,
          body: "right? i have hope for the future!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          songId: 4,
          body: "love what these new kids are coming up with these days",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 4,
          body: "guys i'm not that young...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          songId: 4,
          body: "yeah chill out guys",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 5,
          body: "mac i love your voice man! lets write a song together",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 5,
          body: "can i collab too?!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          songId: 5,
          body: "lets go! come to philly?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          songId: 5,
          body: "me too me too!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 6,
          body: "guuuurl i love this vibe!! making me feel the feels",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          songId: 6,
          body: "seriously, this song makes me feel butterflies :D",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          songId: 6,
          body: "its even make us norwegians feel something!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          songId: 7,
          body: "miss touring with the band.... michael is going crazy on this one",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          songId: 7,
          body: "an absolute BANGER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          songId: 7,
          body: "ive heard my parents listen to this song!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          songId: 7,
          body: "alright mac, no need to make us feel old",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          songId: 7,
          body: "my bad guys... love the song though",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 8,
          body: "this goes so hard..",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          songId: 8,
          body: "wow i wanna record vocals over this!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 8,
          body: "so good...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 11,
          songId: 9,
          body: "hope y'all like my song!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 9,
          body: "keep up the good work!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 12,
          songId: 9,
          body: "pretty good! needs more of a beat though...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 9,
          body: "cinematic!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 10,
          body: "this is niiiiiiice!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          songId: 10,
          body: "this is CUTE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          songId: 10,
          body: "nice job man",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Comments", {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
  order: 2,
};
