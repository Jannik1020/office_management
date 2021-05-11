const db = require("../models");
const User = db.users;

exports.login = (req, res) => {
  // check provided username
  if (!req.body) {
    res.status(400).send({
      message: "Request body cannot be empty",
    });
  }

  const username = req.body.username;

  User.findOne({ where: { username: username } })
    .then((data) => {
      const user = data;
      console.log(user);
      res.send({
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          organisation: user.organisation,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "User " + username + " not found!",
      });
    });
};

exports.register = (req, res) => {
  // check provided username
  if (!req.body) {
    res.status(400).send({
      message: "Request body cannot be empty",
    });
    return;
  }

  const user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    organisation: req.body.organisation,
  };

  User.create(user)
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error creating user: " + err,
      });
    });
};
