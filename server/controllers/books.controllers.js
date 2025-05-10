const Book = require("../models/Book");
const Loan = require("../models/Loan");

const getBooks = (req, res) => {
  res.send("Test");
};

const createBook = async (req, res) => {
  try {
    const { title, description, author, publicationYear } = req.body;

    const createdBook = await Book.create({
      title,
      description,
      author,
      publicationYear,
    });

    res.status(201).send({ id: createdBook.id });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send("An error occurred while creating the book.");
  }
};

exports.getBooks = getBooks;
exports.createBook = createBook;
