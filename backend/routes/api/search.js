const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");

const { Song, User, Playlist } = require("../../db/models");
const router = express.Router();

router.get("/search", asyncHandler(async function (req, res) {
  console.log(req.params)
}))

module.exports = router;
