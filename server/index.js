const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("./modules/passport");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// init passport
app.use(passport.initialize());

// routes
app.use("/api/auth", require("./modules/authRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
