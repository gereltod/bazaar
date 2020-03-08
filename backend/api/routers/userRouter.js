const passportService = require("../services/passport");
const passport = require("passport");
const user = require("../models/user");

const { validateBody, schemas } = require("../validates/userCheck");

module.exports = app => {
  app.post("/api/login", validateBody(schemas.loginUser), user.login);

  app.post(
    "/api/register",
    validateBody(schemas.createUser),
    user.registerUser
  );
};
