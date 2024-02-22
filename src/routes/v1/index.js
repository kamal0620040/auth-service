const express = require("express");

const { InfoController } = require("../../controllers");
const { UserController } = require("../../controllers/index");
const { AuthRequestValidators } = require("../../middlewares/index");

const router = express.Router();

router.get("/info", InfoController.info);
router.post(
  "/signup",
  AuthRequestValidators.validateUserAuth,
  UserController.create
);
router.post(
  "/signin",
  AuthRequestValidators.validateUserAuth,
  UserController.signIn
);

router.get("/isAuthenticated", UserController.isAuthenticated);

module.exports = router;
