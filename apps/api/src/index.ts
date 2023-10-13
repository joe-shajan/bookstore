require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { elasticClient } from "./elastic-client";
import { seed_books } from "./seed-data";

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

    await elasticClient.index({
      index: "books",
      id: createdbook._id.toString(),
      body: {
        title: createdbook.title,
        author: createdbook.author,
        description: createdbook.description,
        publicationYear: createdbook.publicationYear.toString(),
        isbn: createdbook.isbn,
      },
    });

    res.json({ createdbook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create a new book" });
  }
});
app.post("/seed-books", async (req, res) => {
  try {
    return res.json({ books: seed_books });
    for (let book of seed_books) {
      const newBook = new Book(book);

      const createdbook = await newBook.save();

      await elasticClient.index({
        index: "books",
        id: createdbook._id.toString(),
        body: {
          title: createdbook.title,
          author: createdbook.author,
          description: createdbook.description,
          publicationYear: createdbook.publicationYear.toString(),
          isbn: createdbook.isbn,
        },
      });
      console.log(newBook._id);
    }

    res.json({ books: seed_books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create a new book" });
  }
});

app.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    // Use Elasticsearch to perform the search
    const searchResults = await elasticClient.search({
      index: "books",
      body: {
        query: {
          multi_match: {
            // @ts-ignore
            query,
            fields: ["title", "author", "description", "publicationYear"],
          },
        },
      },
    });

    // Extract and return the search results

    const hits = searchResults.hits.hits;
    // // @ts-ignore
    const books = hits.map((hit) => {
      return {
        _id: hit._id,
        // @ts-ignore
        ...hit._source,
      };
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error performing the search" });
  }
});

// app.get("/search", async (req, res) => {
//   const result = await elasticClient.search({
//     index: "posts",
//     query: { fuzzy: { title: req.query.query } },
//   });

//   res.json(result);
// });

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

    await elasticClient.update({
      index: "books",
      id: updatedBook._id.toString(),
      body: {
        doc: {
          title: updatedBook.title,
          author: updatedBook.author,
          description: updatedBook.description,
          publicationYear: updatedBook.publicationYear.toString(),
          isbn: updatedBook.isbn,
        },
      },
    });

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

    await elasticClient.delete({
      index: "books",
      id: deletedBook._id.toString(),
    });

    res.json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the book" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
