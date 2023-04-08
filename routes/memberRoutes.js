const express = require("express");
const router = express.Router();
const {
  show_member_page,
  show_create_member_form,
  show_edit_member_form,
  create_member,
  update_member,
  delete_member,
} = require("../controllers/memberController");

router.get("/member", show_member_page);
router.get("/member/create-form", show_create_member_form);
router.post("/member/create", create_member);
router.delete("/member/delete/:id", delete_member);
router.get("/member/edit-form/:id", show_edit_member_form);
router.post("/member/update", update_member);

module.exports = router;
