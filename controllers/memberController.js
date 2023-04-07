const { getMembers } = require('../models/memberModel');

async function show_member_page (req, res) {
    try {
      const members = await getMembers();
      res.render("pages/member-related/member", {
        membersList: members,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving Member data from the database");
    }
  };

module.exports = {
  show_member_page
};