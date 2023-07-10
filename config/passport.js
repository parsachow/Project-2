const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');


// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    try{ 
      let userDoc = await User.findOne({ googleId: profile.id });

      //if user is found, pass user info into next middleware function

      if(userDoc) return cb(null, userDoc);

      //if user's first time logging in, Create user

      userDoc = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        avatar: profile.photos[0].value
      });

      //pass the created user's info into next middleware function

      return cb(null, userDoc);

    }catch(err){
      return cb(err)
    }

  }
));

passport.serializeUser(function(user, done) {
  //adds user's mongoDB ID to session cookie
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
  const user =  await User.findById(id);
  done(null, user);
});

