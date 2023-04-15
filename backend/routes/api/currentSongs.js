const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");

const { Song, User, CurrentSong } = require("../../db/models");

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { user, song } = req.body;
    const userId = user.id;
    const songId = song.id;

    const currentSong = await CurrentSong.upload({
      userId,
      songId,
    });
    return res.json({
      song,
    });
  })
);

router.get(
  "/all/:id",
  asyncHandler(async function (req, res) {
    const { id } = req.params;
    const allSongs = await CurrentSong.findAll({
      where: {
        userId: id,
      },
    });
    // const comments = await Comment.findAll({ where: { songId: id } });
    return res.json(allSongs);
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res, next) {
    const { id } = req.params;
    const currentSong = await CurrentSong.findOne({
      where: {
        songId: id,
      },
    });

    if (currentSong) {
      const song = await Song.findByPk(currentSong.songId);
      return res.json(song);
    } else {
      const error = new Error("Current song not found by given ID");
      error.status = 404;
      error.title = "No current song found";
      error.errors = ["Current song not found by given ID"];

      return next(error);
    }
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {


    await CurrentSong.destroy({
      where: {},
      truncate: true
    });
    return res.json();
  })
);

module.exports = router;
