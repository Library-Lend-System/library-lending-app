const sql = require("mssql");
require("dotenv").config();

// Set up the connection string using environment variables
const string_connection = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};Password=${process.env.DB_PWD};Encrypt=false`;

const getMembers = async (res) => {
  /* return member list */
  let con;
  try {
    // Connect to the database using the connection string
    con = await sql.connect(string_connection);
    // Create a new SQL request object
    let request = new sql.Request(con);
    const result = await request.query("select * from Member");
    console.log(string_connection);
    return result.recordset;
  } catch (err) {
    console.log(string_connection);
    res.status(500).send("Error connecting to the database");
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

const getLendings = async (res) => {
  let con;
  try {
    con = await sql.connect(string_connection);
    let request = new sql.Request(con);
    const result = await sql.query("select * from Lending");
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    res.status(500).send("Error connecting to the database");
  } finally {
    if (con) {
      con.close();
    }
  }
}

const getBooks = async (res) => {
  /* return book list */
  let con;
  try {
    // Connect to the database using the connection string
    con = await sql.connect(string_connection);
    // Create a new SQL request object
    let request = new sql.Request(con);
    const result = await request.query("select * from Book");
    return result.recordset;
  } catch (err) {
    console.log(string_connection);
    res.status(500).send("Error connecting to the database");
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

const addBook = async (res, payload) => {
  /* add new book to Book table */
  let con;
  try {
    // Connect to the database using the connection string
    con = await sql.connect(string_connection);
    // Create a new SQL request object
    let request = new sql.Request(con);

    // Find the maximum Book_id in the Book table and increment it by 1
    let getMaxBookIdQuery = "SELECT MAX(Book_id) AS max_id FROM Book";
    let maxBookIdResult = await request.query(getMaxBookIdQuery);
    let newBookId = maxBookIdResult.recordset[0].max_id + 1;

    // Insert a new row into the Book table with the data from the payload
    let create_query = `INSERT INTO Book (Book_id, Title, Author, Genre, Publisher, Publication_date)
      VALUES (${newBookId}, '${payload.Title}', '${payload.Author}', '${payload.Genre}', '${payload.Publisher}', '${payload.Publication_date}')`;
    await request.query(create_query);
    // Return a success message
    return "Book added successfully";
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding book to database");
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

const updateBook = async (res, payload) => {
  /* update book values in Book table */
  let con;
  try {
    // Connect to the database using the connection string
    con = await sql.connect(string_connection);
    // Create a new SQL request object
    let request = new sql.Request(con);

    // create a update query for updating book in the Book table
    let update_query = `UPDATE Book SET Title = '${payload.Title}', Author = '${payload.Author}',
      Genre = '${payload.Genre}', Publisher = '${payload.Publisher}', Publication_date = '${payload.Publication_date}'
      WHERE Book_id = ${payload.Book_id};`;
    await request.query(update_query);
    // Return a success message
    return "Book updated successfully";
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating book to database");
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

const deleteBook = async (res, bookId) => {
  /* delete book from Book table */
  let con;
  try {
    // Connect to the database using the connection string
    con = await sql.connect(string_connection);
    // Create a new SQL request object
    let request = new sql.Request(con);
    let delete_query = `DELETE FROM Book WHERE Book_id = ${bookId};`;
    await request.query(delete_query);
    // Return a success message
    return "Book deleted successfully";
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting book from database");
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

// Set up the Express.js application
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const { check, validationResult, param } = require("express-validator");

var app = express();

// Use the cors and body-parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");

app.get("/members", async (req, res) => {
    try {
        const members = await getMembers(res);
        res.render("pages/member-related/member", {
            membersList: members,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving Member data from the database");
    }
})

app.get("/books", async (req, res) => {
  /* show book page */
  try {
    const books = await getBooks(res);
    res.render("pages/book-related/book", {
      booksList: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving Book data from the database");
  }
});

app.get("/lendings", async (req, res) => {
  try {
    const lendings = await getLendings(res)
    // render pages/lending-related/lending
    res.render("pages/lending-related/lending", {
      lendingsList: lendings,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving Lending data from the database");
  }
});

app.get("/new-book", async (req, res) => {
  /* show new book page with form for recieving input */
  res.render("pages/book-related/create-book-form");
});

app.post("/add-new-book", async function (req, res) {
  /* create new book from the form request */
  try {
    let payload = {
      Title: req.body.Title,
      Author: req.body.Author,
      Genre: req.body.Genre,
      Publisher: req.body.Publisher,
      Publication_date: new Date(req.body.Publication_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };

    await addBook(res, payload);
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding book to database");
  }
});

app.delete("/delete-book/:id", async (req, res) => {
  /* delete specific book with id */
  try {
    await deleteBook(res, req.params.id);
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deletinging book from database");
  }
});

app.get("/edit-book-form/:id", async (req, res) => {
  /* show a book editor form page */
  const books = await getBooks(res);
  let bookToEdit = books.find((book) => book.Book_id == req.params.id);
  res.render("pages/book-related/edit-book-form", {
    initialBook: bookToEdit,
    bookId: req.params.id,
  });
});

app.post("/save-edit-book", async (req, res) => {
  /* save a editted book from book editor */
  try {
    let payload = {
      Book_id: req.body.bookId,
      Title: req.body.Title,
      Author: req.body.Author,
      Genre: req.body.Genre,
      Publisher: req.body.Publisher,
      Publication_date: new Date(req.body.Publication_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };

    await updateBook(res, payload);
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding book to database");
  }
});

app.get("/", function (req, res) {
  res.render("pages/home");
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
