const express = require("express");
const router = express.Router();
const {
  show_book_page,
  show_create_book_form,
  show_edit_book_form,
  create_book,
  update_book,
  delete_book,
} = require("../controllers/bookController");

router.get("/book", show_book_page);
router.get("/book/create-form", show_create_book_form);
router.post("/book/create", create_book);
router.delete("/book/delete/:id", delete_book);
router.get("/book/edit-form/:id", show_edit_book_form);
router.post("/book/update", update_book);

module.exports = router;
