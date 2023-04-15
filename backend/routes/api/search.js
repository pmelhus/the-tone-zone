const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  sortArrayBySearchStringMatch,
  sortArrayBySearchStringMatchUsers,
} = require("../../utils/sortSearchArray");

const { Song, User, Playlist } = require("../../db/models");
const router = express.Router();

router.get(
  "/:searchWord",
  asyncHandler(async function (req, res) {
    const searchWord = req.params.searchWord;
    console.log(searchWord);
    const songsRes = await Song.findAll({
      where: {
        title: {
          [Op.or]: [
            { [Op.substring]: searchWord.toLowerCase() },
            { [Op.substring]: searchWord.toUpperCase() },
            { [Op.substring]: searchWord },
            { [Op.iRegexp]: searchWord },
          ],
        },
      },
      include: User,
    });

    const usersRes = await User.findAll({
      where: {
        username: {
          [Op.or]: [
            { [Op.substring]: searchWord.toLowerCase() },
            { [Op.substring]: searchWord.toUpperCase() },
          ],
        },
      },
    });
    const playlistsRes = await Playlist.findAll({
      where: {
        title: {
          [Op.or]: [
            { [Op.substring]: searchWord.toLowerCase() },
            { [Op.substring]: searchWord.toUpperCase() },
          ],
        },
      },
      include: User,
    });

    return res.json({
      songs: sortArrayBySearchStringMatch(songsRes, searchWord),
      users:   sortArrayBySearchStringMatchUsers(usersRes, searchWord),
      playlists:  sortArrayBySearchStringMatchUsers(playlistsRes, searchWord)
    });
  })
);

module.exports = router;
