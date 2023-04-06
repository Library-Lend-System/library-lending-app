// Import the mssql library and dotenv configuration module
const sql = require('mssql')
require('dotenv').config()

// Set up the connection string using environment variables
const string_connection = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};Password=${process.env.DB_PWD};Encrypt=false`;

const getMembers = async(res) => {
    /* Retrieves all rows from the `Member` table in the database */
    let con;
    try {
        // Connect to the database using the connection string
        con = await sql.connect(string_connection)
        // Create a new SQL request object
        let request = new sql.Request(con);
        const result = await request.query('select * from Member');
        console.log(string_connection);
        return result;
    }
    catch (err) {
        console.log(string_connection);
        res.status(500).send('Error connecting to the database');

    } finally {
        // Close the database connection
        if (con) {
            con.close();
        }
    }
}

const getBooks = async(res) => {
    /* Retrieves all rows from the `Book` table in the database */
    let con;
    try {
        // Connect to the database using the connection string
        con = await sql.connect(string_connection)
        // Create a new SQL request object
        let request = new sql.Request(con);
        const result = await request.query('select * from Book');
        console.log(string_connection);
        return result;
    }
    catch (err) {
        console.log(string_connection);
        res.status(500).send('Error connecting to the database');

    } finally {
        // Close the database connection
        if (con) {
            con.close();
        }
    }
}

// Set up the Express.js application
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

// Use the cors and body-parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set("view engine", "ejs");


app.get("/members", async (req, res) => {
    // return a list of members in Member table
    try {
        const members = await getMembers(res);
        console.log(members);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving data from the database');
    }
});

app.get("/books", async (req, res) => {
    // return a list of members in Member table
    try {
        const books = await getBooks(res);
        console.log(books);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving data from the database');
    }
});

app.get("/lending", function (req, res) {
    res.render("pages/lending");
});

app.get("/return", function (req, res) {
    res.render("pages/return");
});

app.post("/lending", function (req, res) {
    // save the lending data to the database
    res.render("pages/lending");
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));