const sql = require("mssql");
require("dotenv").config();

// Set up the connection string using environment variables
const string_connection = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};Password=${process.env.DB_PWD};Encrypt=false`;

const getLendings = async (res) => {
  let con;
  try {
    con = await sql.connect(string_connection);
    let request = new sql.Request(con);
    const result = await sql.query("select * from Lending");
    return result.recordset;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (con) {
      con.close();
    }
  }
};

const returnLending = async (res, payload) => {
  /* update return date values in Lending table */
  let con;
  try {
    // Connect to the database using the connection string
    con = await sql.connect(string_connection);
    // Create a new SQL request object
    let request = new sql.Request(con);

    request.input("Lending_id", sql.Int, payload.Lending_id);
    request.input("Return_date", payload.Return_date);

    await request.execute("returnLending");
    // Return a success message
    return "Return Lending successfully";
  } catch (err) {
    throw new Error(err);
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

const addLending = async (res, payload) => {
  /* create new lending in Lending table */
  let con;
  try {
    // Connect to the database using the connection string
    con = await sql.connect(string_connection);
    // Create a new SQL request object
    let request = new sql.Request(con);

    let getMaxLendIdQuery = "SELECT MAX(Lending_id) AS max_id FROM Lending";
    let maxLendIdResult = await request.query(getMaxLendIdQuery);
    let newLendId = maxLendIdResult.recordset[0].max_id + 1;

    const Member_id = payload.Member_id;
    const Book_id = payload.Book_id;
    const Borrow_date = payload.Borrow_date;

    request.input("Lending_id", sql.Int, newLendId);
    request.input("Member_id", sql.Int, Member_id);
    request.input("Book_id", sql.Int, Book_id);
    request.input("Borrow_date", Borrow_date);

    await request.execute("createLending");
    // Return a success message
    return "Create Lending successfully";
  } catch (err) {
    throw new Error(err);
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

module.exports = {
  getLendings,
  returnLending,
  addLending,
};
