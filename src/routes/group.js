const express = require("express");
const router = express.Router();
const { Group } = require("../models/index");

const { createGroup } = require("../controller/group");

router.post("/", createGroup);

router.get("/:groupid", async (req, res) => {
  Group.findOne({
    where: {
      id: req.params.groupid,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
    });
});
router.post();

module.exports = router;
