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

const getLends = async(res) => {
    /* Retrieves all rows from the `Book` table in the database */
    let con;
    try {
        // Connect to the database using the connection string
        con = await sql.connect(string_connection)
        // Create a new SQL request object
        let request = new sql.Request(con);
        const result = await request.query('select * from Lending');
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

app.get('/', function(req, res) {
    res.render('pages/home')
})

app.get("/lend", async function (req, res) {
  let results = await getLends(res);
  res.render("lending", {
    resultsLending: results.recordset,
  });
});

app.post("/lend/create", async function(req, res){
     // Connect to the database using the connection string
     con = await sql.connect(string_connection)
     // Create a new SQL request object
     let request = new sql.Request(con);

    let getMaxLendIdQuery = "SELECT MAX(Lending_id) AS max_id FROM Lending";
    let maxLendIdResult = await request.query(getMaxLendIdQuery);
    let newLendId = maxLendIdResult.recordset[0].max_id + 1;
    
    const member = req.body.member_id;
    const book = req.body.book_id;
    const borrow = req.body.borrow_date;

    request.input('Lending_id', sql.Int, newLendId);
    request.input('Member_id', sql.Int, member);
    request.input('Book_id', sql.Int, book);
    request.input('Borrow_date', sql.Date, borrow);

    request.execute('createLending', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong!');
        } else {
            res.send(result.recordset);
        }
    });
});

app.post("/lend/return", async function(req, res){
    // Connect to the database using the connection string
    con = await sql.connect(string_connection)
    // Create a new SQL request object
    let request = new sql.Request(con);
   
   const member = req.body.member_id;
   const book = req.body.book_id;
   const return_date = req.body.return_date;

   request.input('Member_id', sql.Int, member);
   request.input('Book_id', sql.Int, book);
   request.input('Return_date', sql.Date, return_date);

   request.execute('returnLending', (err, result) => {
       if (err) {
           console.log(err);
           res.status(500).send('Something went wrong!');
       } else {
           res.send(result.recordset);
       }
   });
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));