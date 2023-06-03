//require enviorment variables
require('dotenv').config();



//require all packages 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Note = require('./models/Note');
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const bodyParser=require("body-parser");
const fetchuser=require("./middleware/fetchuser")
const Category = require('./models/Category');
const pick = require("lodash/pick");
const path=require('path');
const cookieSession=require("cookie-session")
const passport=require("passport");
const passportSetup=require("./passport")
const authRoute = require("./routes/auth");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const resultRouter=require("./config/resultRouter")





//setup port

const cors = require('cors');
const router = require('./config/router');
const blogRouter=require('./config/blogRouter')
const textbookRouter=require('./config/textbookRouter')
app.use('/uploads', express.static('uploads'));




app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 1000,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use('/api/auth', require('./routes/userRoute'));
app.use('/api/quiz', require('./routes/quizRoute'));
app.use('/api/tags',require('./routes/tags'));
app.use('/api/reply',require('./routes/replies'));
app.use('/api/posts',require('./routes/posts'));
                                                      
app.use("/api", router);
app.use("/api",blogRouter); 
app.use("/api",textbookRouter)   
app.use("/api/auth", authRoute);    
app.use("/api",resultRouter);                                                                              




//all the endpoints here
// POST -- http://localhost:3003/api/note (create new note)
// GET -- http://localhost:3003/api/notes/:type/:oauthid (get all notes)
// PUT -- http://localhost:3003/api/note/:noteid (update single note)
// DELETE -- http://localhost:3003/api/note/:noteid (delete single note)

//Port listening and mongoose connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const PORT=process.env.PORT || 2000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



  if(process.env.NODE_ENV=='production')
  {
    app.use(express.static("frontend/build"));
  }
app.listen(PORT,()=>{
    console.log("app listening")
})

