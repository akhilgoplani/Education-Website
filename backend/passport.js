const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./models/User");



// ...

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;

  
        let user = await User.findOne({ googleId: id });

        if (user) {
          // User already exists, return it
          done(null, user);
        } else {
          // User doesn't exist, create a new user
          user = new User({
            name: displayName,
            email: email,
            authMethod: "google",
            googleId: id,
            avatarUrl: photos[0].value,
          });

          await user.save();
          done(null, user);
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, "helloiamsecret", {
          expiresIn: "1h",
        });

        // Append the token to the redirect URL
        const redirectUrl = `${process.env.CLIENT_URL}?token=${encodeURIComponent(token)}&success=true`;
        done(null, redirectUrl);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
