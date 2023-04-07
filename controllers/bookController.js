const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../models/bookModel");

async function show_book_page (req, res) {
  /* show book page */
  try {
    const books = await getBooks();
    res.render("pages/book-related/book", {
      booksList: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving Book data from the database");
  }
};

function show_create_book_form(req, res) {
  /* show form for creating a new book */
  res.render("pages/book-related/create-book-form");
};

async function show_edit_book_form(req, res) {
    /* show a book editor form page */
  const books = await getBooks(res);
  let bookToEdit = books.find((book) => book.Book_id == req.params.id);
  res.render("pages/book-related/edit-book-form", {
    initialBook: bookToEdit,
    bookId: req.params.id,
  });
};

async function create_book(req, res) {
  /* create new book from the form submittion */
  try {
    let payload = {
      Title: req.body.Title,
      Author: req.body.Author,
      Genre: req.body.Genre,
      Publisher: req.body.Publisher,
      Publication_date: new Date(req.body.Publication_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };
    await addBook(res, payload);
    res.redirect("/book");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding book to database");
  }
};

async function update_book(req, res) {
  /* save a edited book to db */
  try {
    let payload = {
      Book_id: req.body.bookId,
      Title: req.body.Title,
      Author: req.body.Author,
      Genre: req.body.Genre,
      Publisher: req.body.Publisher,
      Publication_date: new Date(req.body.Publication_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };
    // console.log(payload)
    await updateBook(res, payload);
    res.redirect("/book");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating book in database");
  }
};

async function delete_book(req, res) {
  /* delete book with a specify id */
  try {
    await deleteBook(res, req.params.id);
    res.redirect("/book");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deletinging book from database");
  }
};

module.exports = {
  show_book_page, show_create_book_form, show_edit_book_form, create_book, update_book, delete_book
};
