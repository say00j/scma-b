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
//get list of complaints for user endpoint
app.get("/mycomplaints/:username", async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch data from the database based on the username
    const mycomplaints = await collection.ComplaintModel.find({
      UserName: username,
    }).sort({
      Status: -1, //sorting in descenting order
    });

    //console.log(mycomplaints);
    return res.json(mycomplaints); // Return list of mycomplaints as JSON response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" }); // Return error for any server-side error
  }
});

module.exports.handler = serverless(app);
