const router = require("express").Router();
const passport = require("../authentication/passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {
    // Successful authentication,
    const user = req.user;
    res.status(200).json({ message: "success" });
  }
);

module.exports = router;
