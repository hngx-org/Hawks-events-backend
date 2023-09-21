const express = require("express");
const { PORT } = require("./src/config/constants");
const cors = require("cors");
const errorHandler = require("./src/middlewares/error-handler");
const notFound = require("./src/middlewares/not-found");
const { User, Group, UserGroup } = require("./src/models/index");

const app = express();

app.use(cors());
// these already do the work of bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//bring in the routes
app.get("/api/groups", async (req, res) => {
  try {
    const group = await Group.findAll();
    res.send(group);
  } catch (err) {
    res.send(err.message);
  }
});
app.get("/api/groups/:groupid", async (req, res) => {
  try {
    const group = await Group.findOne({
      where: {
        id: req.params.groupid,
      },
    });
    res.send(group);
  } catch (err) {
    res.send(err.message);
  }
});
app.delete("/api/groups/:group/members/:userid", (req, res) => {
  try {
    const { groupid, userid } = req.params;
    res.send(groupid, userid);
  } catch (err) {
    res.send(err.message);
  }
});

// app.use(errorHandler);
// app.use(notFound);

const server = app.listen(PORT, () => {
  console.log(`App started at port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  server.close(() => process.exit(1));
});
