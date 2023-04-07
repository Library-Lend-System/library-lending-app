const { getMembers, deleteMember } = require('../models/memberModel');

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

async function delete_member (req, res) {
  try {
    await deleteMember(res, req.params.id);
    res.redirect("/member");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deletinging member from database");
  }
}

module.exports = {
  show_member_page, delete_member
};