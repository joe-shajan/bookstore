import { axios } from "@/lib/axios";
import type { InterfaceBook } from "@/types";

export const getAllBooks = async (
  page: number
): Promise<{ books: InterfaceBook[]; bookCount: number }> => {
  console.log("in get all books");

  const response = await axios.get(`books?page=${page}`);
  const { books, bookCount } = response.data;
  return { books, bookCount };
};
