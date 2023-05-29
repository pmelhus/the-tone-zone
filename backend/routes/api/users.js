const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

const validateEdit = [
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  handleValidationErrors,
];

router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body


    if (req.file) {

      const profileImageUrl = await singlePublicFileUpload(req.file);



      const user = await User.signup({
        email,
        username,
        password,
        profileImageUrl,
      });


      await setTokenCookie(res, user);
      return res.json({
        user,
      });
    } else {
      const user = await User.signup({
        email,
        username,
        password
      });


      await setTokenCookie(res, user);
      return res.json({
        user,
      });
    }
  })
);

router.put(
  "/:id",
  singleMulterUpload("image"),
  validateEdit,
  asyncHandler(async (req, res) => {

    const { username, id } = req.body
if (req.file) {


  const profileImageUrl = await singlePublicFileUpload(req.file);

  const user = await User.findByPk(id)

  const updatedUser = await user.update({

    username: username,
    profileImageUrl: profileImageUrl
  });


  await setTokenCookie(res, updatedUser);
  return res.json(updatedUser);
} else {

  const user = await User.findByPk(id)

  const updatedUser = await user.update({

    username: username,

  });


  await setTokenCookie(res, updatedUser);
  return res.json(updatedUser);
}
  })
);

module.exports = router;
