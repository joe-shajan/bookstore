import { elasticClient } from "@/elastic-client";
import { HttpException } from "@/exceptions/httpException";
import { Book } from "@/models/book.model";

export class BookService {
  public createBook = async (data: any) => {
    const { title, author, publicationYear, isbn, description } = data;

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

    return createdbook;
  };

  public getBooks = async (page: number) => {
    const itemsPerPage = 12;

    const skip = page * itemsPerPage;

    const books = await Book.find().skip(skip).limit(itemsPerPage);

    const bookCount = await Book.countDocuments();

    return { books, bookCount };
  };

  public getBookById = async (bookId: string) => {
    const book = await Book.findById(bookId);

    if (!book) {
      throw new HttpException(404, "Book not found");
    }

    return { book };
  };

  public updateBookById = async (bookId: string, data: any) => {
    const { title, author, publicationYear, isbn, description } = data;

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
      throw new HttpException(404, "Book not found");
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

    return updatedBook;
  };

  public deleteBookById = async (bookId: string) => {
    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (!deletedBook) {
      throw new HttpException(404, "Book not found");
    }

    await elasticClient.delete({
      index: "books",
      id: deletedBook._id.toString(),
    });

    return deletedBook;
  };

  public searchBook = async (query: string) => {
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

    const hits = searchResults.hits.hits;
    // // @ts-ignore
    const books = hits.map((hit) => {
      return {
        _id: hit._id,
        // @ts-ignore
        ...hit._source,
        // @ts-ignore
        publicationYear: +hit._source.publicationYear,
      };
    });

    return { books };
  };
}
