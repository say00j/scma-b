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
// Get list of comlaints for admin endpoint
app.get("/usercomplaints", async (req, res) => {
  try {
    //const usercomplaints = await collection.SystemModel.find(); // Fetch list of usercomplaints from database
    const usercomplaints = await collection.ComplaintModel.find().sort({
      Status: -1, //sorting in descenting order
    });
    //console.log(usercomplaints);
    return res.json(usercomplaints); // Return list of usercomplaints as JSON response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" }); // Return error for any server-side error
  }
});

module.exports.handler = serverless(app);
