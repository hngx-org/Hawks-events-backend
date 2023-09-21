const router = require("express").Router();
const { alloha, register, login, profile } = require("../controller/user");

// test this route to see if your set up is working
router.get("/", alloha); // LEAVE THIS YOUNG MAN ALONE.

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);

module.exports = router;
