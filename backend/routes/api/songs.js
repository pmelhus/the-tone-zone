
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");

// const songValidations = require('../../utils/songs')
const { Song, CurrentSong, User, Comment } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const allSongs = await Song.findAll({
      include: [User, Comment]
    });

    return res.json(allSongs);
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const { id } = req.params;
    const song = await Song.findByPk(id, {
      include: User,
    });

    return res.json(song);
  })
);

router.post(
  "/",
  multipleMulterUpload("files"),

  asyncHandler(async (req, res) => {
    const { userId, title, description } = req.body;


    const files = await multiplePublicFileUpload(req.files);

    const url = files[0];
    const imageUrl = files[1];

    const user = await User.findByPk(userId);

    const song = await Song.upload({
      userId,
      title,
      description,
      url,
      imageUrl,
    });
    return res.json({
      song,
      user,
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {

    const id = req.body.songId;
    const reqTitle = req.body.title;
    const reqDescription = req.body.description;
    const song = await Song.findByPk(id);

    const editedSong = await song.update({
      title: reqTitle,
      description: reqDescription,
    });

    return res.json(editedSong);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const song = await Song.findByPk(id);
    const currentSong = await CurrentSong.findOne({
      where: {
        songId: id
      }
    })
    await song.destroy();
    if (currentSong) {
      await currentSong.destroy()
    }
    return res.json(song);
  })
);

router.get(
  "/fetchedSongs",
  asyncHandler(async(req,res) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3e50c0eb79msh1518f938d7c9afcp11a11fjsnaa58465f4eea',
        'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
      }
    };

  const fetchResponse = fetch('https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata?track=https%3A%2F%2Fsoundcloud.com%2Fedsheeran%2Fphotograph', options)
      .then(response => response.json())

      .catch(err => console.error(err));
  })
)

module.exports = router;
