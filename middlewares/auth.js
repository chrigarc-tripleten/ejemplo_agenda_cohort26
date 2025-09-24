require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_WORD = process.env.SECRET_WORD;

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  //console.log(req.headers, authorization);
  if (!authorization) {
    return res.status(400).send({
      status: false,
      message: "NOT AUTH",
    });
  }
  try {
    const token = authorization.replaceAll("Bearer ", "");
    const decoded = jwt.verify(token, SECRET_WORD);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).send({
      status: false,
      message: "NOT AUTH",
    });
  }
};
