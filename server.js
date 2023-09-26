const express = require("express");
const { PORT } = require("./src/config/constants");
const cors = require("cors");
const errorHandler = require("./src/middlewares/error-handler");
const notFound = require("./src/middlewares/not-found");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//bring in the routes
const user = require("./src/routes/user");
const group = require("./src/routes/group");
const events = require("./src/routes/event");
const comment = require("./src/routes/comments");
const upload = require("./src/routes/upload");

app.use("/api/users", user);
app.use("/api/events", events);
app.use("/api/group", group);

// <<<<<<< Team-F
// =======
// app.use("/api/comment", comment);
// app.use("/api/upload", upload);

// >>>>>>> main
app.use(errorHandler);
app.use(notFound);

const server = app.listen(PORT, () => {
  console.log(`App started at port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
// <<<<<<< Team-F
//   console.log(`Error: ${err.message}`);
// 	server.close(() => process.exit(1));
// =======
//   server.close(() => process.exit(1));
// >>>>>>> main
});
