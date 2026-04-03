const express = require("express");
const app = express();

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/authors");
const resetRouter = require("./controllers/reset");
const readingListRouter = require("./controllers/readingLists");
const defaultRouter = require("./controllers/default");
const { errorHandler } = require("./utils/middleware");

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.info("Method:", request.method);
  console.info("Path:  ", request.path);
  console.info("Body:  ", request.body);
  console.info("---");
  next();
};

app.use(requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/reset", resetRouter);
app.use("/api/readinglists", readingListRouter);
app.use("/", defaultRouter);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
