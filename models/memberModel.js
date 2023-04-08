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
    throw new Error(err);
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
    throw new Error(err);
  } finally {
    // Close the database connection
    if (con) {
      con.close();
    }
  }
};

const addMember = async (res, payload) => {
  let con;
  try {
    con = await sql.connect(string_connection);
    let request = new sql.Request(con);

    let getMaxMemberIdQuery = "SELECT MAX(Member_id) AS max_id FROM Member";
    let maxMemberIdResult = await request.query(getMaxMemberIdQuery);
    let newMemberId = maxMemberIdResult.recordset[0].max_id + 1;
    console.log(newMemberId);
    let create_member_query = `INSERT INTO Member (Member_id, Member_name, Member_gender, Member_age)
        VALUES (${newMemberId}, '${payload.Member_name}', '${payload.Member_gender}', '${payload.Member_age}')`;
    let create_contact_query = `INSERT INTO Contact (Member_id, Phone_number)
        VALUES (${newMemberId}, '${payload.Phone_number}')`;
    await request.query(create_member_query);
    await request.query(create_contact_query);
    return "Member & Contact added successfully";
  } catch (err) {
    throw new Error(err);
  } finally {
    if (con) {
      con.close();
    }
  }
};

const updateMember = async (res, payload) => {
  let con;
  try {
    con = await sql.connect(string_connection);
    let request = new sql.Request(con);
    let update_member_query = `UPDATE Member SET Member_name = '${payload.Member_name}', Member_gender = '${payload.Member_gender}',
          Member_age = '${payload.Member_age}' WHERE Member_id = ${payload.Member_id};`;
    let update_contact_query = `UPDATE Contact SET Phone_number = '${payload.Phone_number}' WHERE Member_id = ${payload.Member_id};`;
    await request.query(update_member_query);
    await request.query(update_contact_query);
    return "Member & Contact updated successfully";
  } catch (err) {
    throw new Error(err);
  } finally {
    if (con) {
      con.close();
    }
  }
};

module.exports = {
  getMembers,
  deleteMember,
  addMember,
  updateMember,
};
