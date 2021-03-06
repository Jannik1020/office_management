module.exports = (app) => {
  const user = require("../controller/user.controller");
  const router = require("express").Router();

  router.post("/login", user.login);
  router.post("/register", user.register);

  app.use("/api/user", router);
};
