const mongoose = require("mongoose");
const { Schema } = mongoose;

// create a new schema for booking a movie
const bookMovieSchema = new Schema({
  movie: { type: String }, // the name of the movie being booked
  slot: { type: String }, // the time slot for the movie
  seats: {
    // an object containing the seat numbers and their corresponding count
    A1: { type: Number },
    A2: { type: Number },
    A3: { type: Number },
    A4: { type: Number },
    D1: { type: Number },
    D2: { type: Number },
  },
});

// export the schema as a mongoose model
module.exports = mongoose.model("bookmovietickets", bookMovieSchema);
