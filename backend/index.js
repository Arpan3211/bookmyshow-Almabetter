const express = require("express"); 
const app = express(); 
const { connection } = require("./connection.js"); 
const cors = require("cors"); 
const bodyParser = require("body-parser"); 
const path = require('path');

// Defining the port number
const PORT = process.env.PORT || 8080; 

// Configuring the body-parser middleware to parse urlencoded data
app.use(bodyParser.urlencoded({ extended: false })); 

// Configuring the body-parser middleware to parse json data
app.use(bodyParser.json()); 

// Configuring cors middleware
app.use(cors()); 

// Calling the database connection function
connection(); 

// app.use(express.static(path.join(__dirname+'./frontend/build')));
// app.get("*",function(req, res){
//     res.sendFile(path.join(__dirname + "./frontend/build/index.html"))
// })

app.use("/api", require("./routes")); 

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); // Starting the server and logging a message to the console

module.exports = app;
