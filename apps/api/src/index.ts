import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

async function connectToDatabase() {
  await mongoose.connect(process.env.DB_URL as string);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectToDatabase();

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define your book schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publicationYear: Number,
  isbn: String,
  description: String,
});

interface InterfaceBook extends mongoose.Document {
  title: string;
  author: string;
  publicationYear: number;
  isbn: string;
  description: string;
}

const Book = mongoose.model<InterfaceBook>("Book", bookSchema);

app.get("/", (_req: Request, res: Response) => {
  return res.json({ message: "Express Typescript API" });
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publicationYear, isbn, description } = req.body;
    console.log(req.body);

    const newBook = new Book({
      title,
      author,
      publicationYear,
      isbn,
      description,
    });

    const createdbook = await newBook.save();

    res.json({ createdbook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create a new book" });
  }
});

app.get("/books", async (req, res) => {
  const itemsPerPage = 12;
  const page = req.query.page ? +req.query.page : 0;

  try {
    const skip = page * itemsPerPage;

    const books = await Book.find().skip(skip).limit(itemsPerPage);

    const bookCount = await Book.countDocuments();

    res.json({ books, bookCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve books" });
  }
});

app.get("/books/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve the book" });
  }
});

app.put("/books/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    const { title, author, publicationYear, isbn, description } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        author,
        publicationYear,
        isbn,
        description,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the book" });
  }
});

app.delete("/books/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the book" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
