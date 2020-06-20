
const Mongoose = require('mongoose');

const definition = {
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
}

const BooksSchema = new Mongoose.Schema(definition);

BooksSchema.index({ isbn: 1 }, { unique: true, required: true });

const BooksModel = Mongoose.model("books", BooksSchema, "books");

const create = async (book) => {
  try {
    const newBook = await BooksModel.create(book);
    console.log("Successfully created new book", newBook.isbn);
    return newBook;
  } catch (error) {
    console.error("Error in creating new book", error);
    return ({
      message: "Technical Error",
      error: error.toString()
    });
  }
}

const fetch = async ({
  filter = {},
  skip = 0,
  limit = 10,
  sort = "createdAt",
  select = ""
}) => {
  try {
    console.log("filter", filter)
    const books = await BooksModel.find(filter).sort(sort).skip(skip).limit(limit).select(select);
    console.log("fetched", books.length, "books");
    return books;
  } catch (error) {
    console.error("Error in fetching all books");
    return ({
      message: "Technical Error",
      error: error.toString()
    });
  }
}

const fetchById = async ({
  id,
  select = ""
}) => {
  if (!id) {
    console.error("Id not available");
    return ({
      message: "Provide Id is required"
    });
  } else {
    try {
      const book = await BooksModel.findById(id).select(select);
      console.log("got book", book);
      return book;
    } catch (error) {
      console.error("Error in fetching book", book);
      return ({
        message: "Technical Error.",
        error: error.toString()
      });
    }
  }
}

module.exports = {
  create,
  fetch,
  fetchById
}
