import mongoose from "mongoose";
import { InterfaceBook } from "@/interfaces/book.interface";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publicationYear: Number,
  isbn: String,
  description: String,
});

export const Book = mongoose.model<InterfaceBook>("Book", bookSchema);
