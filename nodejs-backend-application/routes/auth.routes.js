const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");
const route = require("express").Router();

route.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  controller.signup
);

route.post("/signin", controller.signin);

module.exports = route;
