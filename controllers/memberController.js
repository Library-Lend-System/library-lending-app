const {
  getMembers,
  deleteMember,
  addMember,
  updateMember,
} = require("../models/memberModel");

async function show_member_page(req, res) {
  try {
    const members = await getMembers();
    res.render("pages/member-related/member", {
      membersList: members,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("pages/error", { errorMessage: err.message });
  }
}

function show_create_member_form(req, res) {
  res.render("pages/member-related/create-member-form");
}

async function show_edit_member_form (req, res) {
  const members = await getMembers(res);
  let memberToEdit = members.find(member => member.Member_id == req.params.id)
  res.render("pages/member-related/edit-member-form", {
    initialMember: memberToEdit,
    memberId: req.params.id
  })
}

async function create_member(req, res) {
  try {
    let payload = {
      Member_name: req.body.Member_name,
      Member_gender: req.body.Member_gender,
      Member_age: req.body.Member_age,
      Phone_number: req.body.Phone_number,
    };
    await addMember(res, payload);
    res.redirect("/member");
  } catch (err) {
    console.log(err);
    res.status(500).render("pages/error", { errorMessage: err.message });
  }
}

async function update_member(req, res) {
  try {
    let payload = {
      Member_id: req.body.memberId,
      Member_name: req.body.Member_name,
      Member_gender: req.body.Member_gender,
      Member_age: req.body.Member_age,
      Phone_number: req.body.Phone_number,
    };
    await updateMember(res, payload);
    res.redirect("/member");
  } catch (err) {
    console.log(err);
    res.status(500).render("pages/error", { errorMessage: err.message });
  }
}

async function delete_member(req, res) {
  try {
    await deleteMember(res, req.params.id);
    res.redirect("/member");
  } catch (err) {
    console.log(err);
    res.status(500).render("pages/error", { errorMessage: err.message });
  }
}

module.exports = {
  show_member_page,
  show_create_member_form,
  show_edit_member_form,
  create_member,
  update_member,
  delete_member
};
