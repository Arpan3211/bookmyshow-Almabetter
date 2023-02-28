const express = require("express");
const router = express.Router(); 
const Schema = require("./schema"); 
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser"); 

app.use(bodyParser.urlencoded({ extended: false })); // Setting up body-parser middleware to parse urlencoded data
app.use(express.json()); // Setting up express middleware to parse JSON data

// Route to handle booking requests
router.post("/booking", async (req, res) => {

  // Extracting data from request body
  const { movie, slot, seats } = req.body; 

  // Creating a new instance of the booking schema with the extracted data
  const myData = new Schema({ movie, slot, seats });

  // Saving the new booking instance to the database
  const saved = await myData.save();

  if (saved) {
    // If booking is successful, send a success response with the booking data and a success message
    res.status(200).json({ data: myData, message: "Booking successful!" });
  } else {
    // If booking is not successful, send an error response with a null data and an error message
    res
      .status(500)
      .json({
        data: null,
        message: "Something went wrong!. Please try again.",
      });
  }
});

// Route to get the most recent booking data
router.get("/booking", async (req, res) => {
  const myData = await Schema.find().sort({ _id: -1 }).limit(1); // Finding the most recent booking data from the database

  if (myData.length === 0) {
    // If no booking data is found, send a response with a null data and a message
    res.status(200).json({ data: null, message: "No previous Booking found!" });
  } else {
    // If booking data is found, send a success response with the booking data
    res.status(200).json({ data: myData[0] });
  }
});

module.exports = router; 
