const sql = require("mssql");
require("dotenv").config();

// Set up the connection string using environment variables
const string_connection = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};Password=${process.env.DB_PWD};Encrypt=false`;

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

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
