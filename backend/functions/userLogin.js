const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bcrypt = require("bcrypt");
const collection = require("../config");

const app = express();
app.use(express.json());
// Enable CORS for all routes with specific options
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.post("/Userlogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await collection.UserModel.findOne({ name: username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      return res.send("Login successful");
    } else {
      return res.status(401).send("Incorrect password");
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal server error");
  }
});

module.exports.handler = serverless(app);
