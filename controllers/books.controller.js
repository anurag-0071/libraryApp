
const BooksModel = require("../models/books");

const createBook = async (req, res) => {
  const book = req.body;
  console.log("creating new book", book.title);
  try {
    const newBook = await BooksModel.create(book);
    res.send(newBook);
  } catch (error) {
    console.error("Error in creating new Books", error);
    res.status(400).send(error);
  }
}

const getBooks = async (req, res) => {
  console.log("fetch all books");
  try {
    const books = await BooksModel.fetch({});
    res.send(books);
  } catch (error) {
    console.error("Error in fetchin books list", error);
    res.status(400).send(error)
  }
}

const getBookById = async (req, res) => {
  const id = req.param('id');
  try {
    const book = await BooksModel.fetchById({ id });
    res.send(book);
  } catch (error) {
    console.error("Error in fetching book", id);
    res.status(400).send(error);
  }
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
}