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
    const result = await request.query(
      "select M.Member_id, M.Member_name, M.Member_gender, M.Member_age, C.Phone_number " +
      "from Member as M " +
      "join Contact as C " +
      "on M.Member_id = C.Member_id;"
    );
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

const deleteMember = async (res, memberId) => {
  let con;
  try {
    con = await sql.connect(string_connection);
    let request = new sql.Request(con);
    let delete_query = `DELETE FROM Member WHERE Member_id = ${memberId};`;
    await request.query(delete_query);
    return "Member deleted successfully";
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting member from database");
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
}

module.exports = {
  getMembers, deleteMember
};
