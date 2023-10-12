import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

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

app.use(cors());

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
  return res.json({ message: "Express Typescript API on Vercel" });
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publicationYear, isbn, description } = req.body;

    const newBook = new Book({
      title,
      author,
      publicationYear,
      isbn,
      description,
    });

    const savedBook = await newBook.save();

    res.json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create a new book" });
  }
});

app.get("/books", async (req, res) => {
  try {
    // const books = await Book.find();

    const books = [
      {
        id: "1",
        title: "Sample Book 1",
        author: "John Doe",
        publicationYear: 2020,
        isbn: "978-1234567890",
        description: "This is a sample book description for Book 1.",
      },
      {
        id: "2",
        title: "Sample Book 2",
        author: "Jane Smith",
        publicationYear: 2015,
        isbn: "978-0987654321",
        description: "This is a sample book description for Book 2.",
      },
      {
        id: "3",
        title: "Sample Book 3",
        author: "James Brown",
        publicationYear: 2018,
        isbn: "978-5432109876",
        description: "This is a sample book description for Book 3.",
      },
      {
        id: "4",
        title: "Sample Book 4",
        author: "Mary Johnson",
        publicationYear: 2022,
        isbn: "978-6789012345",
        description: "This is a sample book description for Book 4.",
      },
    ];

    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve books" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

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

app.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
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

app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

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
