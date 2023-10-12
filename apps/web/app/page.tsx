"use client";

import { useQuery } from "@tanstack/react-query";
import BookCard from "@/components/book/book-card";
import { Button } from "@/components/button";
import { getAllBooks } from "@/services/book-services";
import { Loader } from "@/components/loader";

export default function Page(): JSX.Element {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => getAllBooks(),
  });

  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-between md:items-center px-4 md:px-12 lg:px-28 mt-6 mb-2">
        <div className="text-2xl font-semibold text-center md:text-left md:mb-0 mb-6">
          All Books
        </div>
        <div className="flex justify-end">
          <Button>Create New Book</Button>
        </div>
      </div>
      <div className="container my-4 mx-auto px-4 md:px-12 lg:px-28">
        <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 md:gap-0">
          {error ? (
            <div className=" text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
              could not fetch books
            </div>
          ) : isLoading ? (
            <div className=" text-lg  container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
              <Loader size="xl" />
            </div>
          ) : data?.length ? (
            data.map((book) => <BookCard book={book} key={book.id} />)
          ) : (
            <div className="text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
              No books found create new.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
