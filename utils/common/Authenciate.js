const jwt = require("jsonwebtoken");
const { users } = require("../../mock/data/users");
const bcrypt = require("bcrypt");

const accessToken = process.env.ACCESS_TOKEN;
const authenciateRequest = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const userToken = bearerToken && bearerToken.split(" ")[1];
  if (token == null) res.sendStatus(401);
  // getting only token. [0] is 'Bearer'
  jwt.verify(userToken, accessToken, (err, response) => {
    if (err) res.sendStatus(403);
    req.user = response;
    console.log(response);
    next();
  });
};

const authorizeUser = async (req, res) => {
  const user = users.find((user) => user.name == req.body.name);
  console.log(user)
  try {
    if (user) {
      if (await bcrypt.compare(user.password, req.body.password))
        res.send("Success");
      else res.send("Not Authorized");
    } else {
      res.status(404).send("No user found");
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

const createAuthorizedUser = async (req, res) => {
  const user = { userName: req.body.name };
  try {
    const salt = await bcrypt.genSalt();
    const encodedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = encodedPassword;
    if (user && user.userName && user.password) {
      users.push(user);
      res.send(user);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
module.exports = { authenciateRequest, authorizeUser, createAuthorizedUser };
