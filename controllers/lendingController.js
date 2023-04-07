const {
  getLendings,
  returnLending,
  addLending,
} = require("../models/lendingModel");

async function show_lending_page(req, res) {
  try {
    const lendings = await getLendings();
    res.render("pages/lending-related/lending", {
      lendingsList: lendings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving Lending data from the database");
  }
}

function show_create_lending_form(req, res) {
  res.render("pages/lending-related/create-lending-form");
}

async function create_lending(req, res) {
  try {
    let payload = {
      Member_id: req.body.Member_id,
      Book_id: req.body.Book_id,
      Borrow_date: req.body.Borrow_date,
    };
    await addLending(res, payload);
    res.redirect("/lending");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding lending to database");
  }
}

async function update_lending_return_date(req, res) {
  try {
    let payload = {
      Lending_id: req.params.id,
      Return_date: new Date()
        .toLocaleDateString()
        .slice(0, 19)
        .replace("T", " "),
    };
    await returnLending(res, payload);
    res.redirect("/lendings");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error update lending to database");
  }
}

module.exports = {
  show_lending_page,
  show_create_lending_form,
  create_lending,
  update_lending_return_date,
};
