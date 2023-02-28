require("dotenv").config();  // Load environment variables from a .env file
const { MongoClient } = require("mongodb");

let mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Retrieve the MongoDB connection URI from the environment variables
const mongoURI = process.env.MONGODBURI;

// Define function to establish connection to MongoDB using Mongoose library
const connectToMongo = async () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      // If the connection is successful, log a message
      console.log("connection established with mongodb server online");
    })
    .catch((err) => {
      // If there is an error during connection, log the error message
      console.log("error while connection", err);
      
    });
};

exports.connection = connectToMongo;
