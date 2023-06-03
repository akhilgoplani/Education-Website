const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/login/failed" }),
  async (req, res) => {
    try {
        console.log(req.user);
        const { _id, name, email, avatarUrl, avatarId, authMethod, googleId } = req.user.user;
     
      console.log(email);
      const user = await User.findOne({ email });
      console.log(user);

      if (user) {
        // User exists, update authMethod and googleId
        user.authMethod = "google";
        user.googleId = req.user.id;
        await user.save();
      } else {
        // User doesn't exist, create a new user
        //const fullName = `${familyName} ${givenName}`
        const newUser = new User({
          name:name,
          email:email,
          authMethod: "google",
          googleId: googleId,
          avatarUrl: avatarUrl,
          avatarId: avatarId,
        });
        console.log(newUser)
        await newUser.save();
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, "helloiamsecret", {
        expiresIn: "1h",
      });

      // Redirect the user to the client URL with the token as a query parameter
      res.redirect(
        `${process.env.CLIENT_URL}?token=${encodeURIComponent(token)}&success=true`
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error")
      
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
