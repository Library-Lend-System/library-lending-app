const express = require("express");
const router = express.Router();
const { show_member_page, delete_member } = require("../controllers/memberController");

router.get("/member", show_member_page);
// router.get("/new-member", memberController.newMember);
// router.post("/add-new-member", memberController.addNewMember);
router.delete("/member/delete/:id", delete_member);
// router.get("/edit-member-form/:id", memberController.editMemberForm);
// router.post("/save-edit-member", memberController.saveEditedMember);

module.exports = router;
