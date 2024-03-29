const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const { Song, User, Comment } = require("../../db/models");

const router = express.Router();

const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Comment cannot be empty."),
  handleValidationErrors,
];

router.post(
  "/",
  validateComment,
  asyncHandler(async (req, res) => {

    const { userId, songId, body } = req.body;
    const user = await User.findByPk(userId);
    const comment = await Comment.create({
      userId,
      songId,
      body,
    });

    return res.json({ comment, user });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allComments = await Comment.findAll({
      include: User,
      Song,
    });
    return res.json(allComments);
  })
);

router.put(
  "/:id",
  validateComment,
  asyncHandler(async function (req, res) {
    const commentId = req.body.comment.id;
    const reqBody = req.body.body;
    const comment = await Comment.findByPk(commentId);

    // delete id;
    const editedSong = await comment.update({ body: reqBody });

    return res.json(editedSong);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.body.id;
    const comment = await Comment.findByPk(id);
    await comment.destroy();
    return res.json(comment);
  })
);

module.exports = router;
