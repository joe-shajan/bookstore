"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { searchBooks } from "@/services/book-services";
import { BookCard, Loader, Input } from "@/components/index";

export default function Page(): JSX.Element {
  const [query, setQuery] = useState<string>("");

  const [debouncedQuery] = useDebounce(query, 500);
  const { data, isLoading, error, refetch } = useQuery(
    ["products", debouncedQuery],
    () => searchBooks(debouncedQuery),
    { enabled: Boolean(debouncedQuery) }
  );

  return (
    <>
      <div className="flex w-full items-center space-x-2 justify-center my-6 px-4">
        <form className="flex gap-3 md:w-1/3 w-full ">
          <Input
            className="w-full"
            onChange={(event) => {
              setQuery(event?.target?.value as string);
            }}
            placeholder="Search"
            type="text"
            value={query}
          />
        </form>
      </div>
      <div className="container my-4 mx-auto px-4 md:px-12 lg:px-28">
        <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 md:gap-0">
          {query ? (
            error ? (
              <div className=" text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
                could not fetch books
              </div>
            ) : isLoading ? (
              <div className=" text-lg  container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
                <Loader size="xl" />
              </div>
            ) : data?.length ? (
              <>
                {data.map((book) => (
                  <BookCard
                    book={book}
                    key={book._id}
                    refetch={refetch}
                    //   setEditingBook={setEditingBook}
                  />
                ))}
              </>
            ) : (
              <div className="text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
                Your search -<span className="font-semibold mx-2">{query}</span>
                - did not match any documents.
              </div>
            )
          ) : (
            <div className="text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
              Search for books
            </div>
          )}
        </div>
      </div>
    </>
  );
}
