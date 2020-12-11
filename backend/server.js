const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//req middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");

//bring db
require("./config/db");

//req routes
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");

//use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

//passport
require("./config/passport")(passport);

//use router
app.use("/user", userRoute);
app.use("/profile", profileRoute);

const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`server started at ${PORT}`));
