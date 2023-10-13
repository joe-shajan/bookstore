import { axios } from "@/lib/axios";
import type { InterfaceBook } from "@/types";

export const getAllBooks = async (
  page: number
): Promise<{ books: InterfaceBook[]; bookCount: number }> => {
  const response = await axios.get(`books?page=${page}`);
  const { books, bookCount } = response.data;
  return { books, bookCount };
};

export const getBookById = async (id: string): Promise<InterfaceBook> => {
  const response = await axios.get(`books/${id}`);
  const { book } = response.data;
  return book;
};

export const searchBooks = async (query: string): Promise<InterfaceBook[]> => {
  const response = await axios.get(`books/search?query=${query}`);
  const { books } = response.data;
  return books;
};
