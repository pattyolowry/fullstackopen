const { Blog } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

const errorHandler = (error, _req, response, next) => {
  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({
      error: error.errors.map((e) => {
        if (e.message === "Validation isEmail on username failed") {
          return "username must be a valid email address";
        } else {
          return e.message;
        }
      }),
    });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error });
  } else if (error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Unable to parse request body" });
  } else if (error.message) {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.user = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = {
  blogFinder,
  errorHandler,
  tokenExtractor,
};
