const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bcrypt = require("bcrypt");
const collection = require("../config");

const app = express();
app.use(express.json());
app.use(cors());

// user Signup endpoint
app.post("/UserSignup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await collection.UserModel.findOne({ name: username });

    if (existingUser) {
      return res.send("User already exists. Please try another username."); // Return error if user already exists
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      name: username,
      password: hashedPassword,
    };

    await collection.UserModel.create(newUser); // Create new user
    return res.send("User created successfully.");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send("Internal server error"); // Return error for any server-side error
  }
});

module.exports.handler = serverless(app);
