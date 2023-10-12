import { axios } from "@/lib/axios";
import type { InterfaceBook } from "@/types";

export const getAllBooks = async (): Promise<InterfaceBook[]> => {
  console.log("in get all books");

  const response = await axios.get("books");
  console.log(response);

  return response.data.books;
};
