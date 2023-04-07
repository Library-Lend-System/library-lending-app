// Import necessary modules
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

// Import routes
const bookRoutes = require("./routes/bookRoutes");
const lendingRoutes = require("./routes/lendingRoutes");
const memberRoutes = require("./routes/memberRoutes");

// Set up the Express.js application
var app = express();

// Use the cors and body-parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Use the imported routes
app.use(bookRoutes);
app.use(lendingRoutes);
app.use(memberRoutes);

app.get("/", function (req, res) {
  res.render("pages/home");
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
