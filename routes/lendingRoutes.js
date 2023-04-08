const express = require("express");
const router = express.Router();
const {
  show_lending_page,
  show_create_lending_form,
  create_lending,
  update_lending_return_date,
} = require("../controllers/lendingController");

router.get("/lending", show_lending_page);
router.get("/lending/create-form", show_create_lending_form);
router.post("/lending/create", create_lending);
router.post("/lending/update-return-date/:id", update_lending_return_date);

module.exports = router;
