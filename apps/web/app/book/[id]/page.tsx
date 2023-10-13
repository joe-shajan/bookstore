"use client";

import { useQuery } from "@tanstack/react-query";
import { BookCard, Loader } from "@/components/index";
import { getBookById } from "@/services";

export default function Page({ params }): JSX.Element {
  const { id } = params;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["book"],
    queryFn: () => getBookById(id),
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {error ? (
        <div className=" text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
          could not fetch book
        </div>
      ) : isLoading ? (
        <Loader size="xl" />
      ) : data ? (
        <BookCard
          book={data}
          refetch={refetch}
          // setEditingBook={setEditingBook}
        />
      ) : null}
    </div>
  );
}
