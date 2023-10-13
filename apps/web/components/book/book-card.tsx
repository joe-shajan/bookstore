import Link from "next/link";
import React from "react";
import { CiBarcode } from "react-icons/ci";
import {
  BsBook,
  BsCalendar2Date,
  BsPen,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { MdOutlineDescription } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { InterfaceBook } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/index";
import { axios } from "@/lib";

interface InterfaceBookCard {
  book: InterfaceBook;
  refetch: () => void;
  setEditingBook?: (book: InterfaceBook | null) => void;
}

export function BookCard({
  book,
  setEditingBook,
  refetch,
}: InterfaceBookCard): JSX.Element {
  const deleteBookMutation = useMutation({
    mutationFn: (bookId: string) => {
      return axios.delete(`/books/${bookId}`);
    },
    onSuccess: () => {
      refetch();
      toast.success("book deleted successfully");
    },
    onError: () => {
      toast.error("deleting book failed");
    },
  });

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
      <article className="bg-gray-50 overflow-hidden rounded-lg shadow-md hover:shadow-lg border-slate-100 border p-3 md:p-0 text-slate-700">
        <Link href={`/book/${book._id}`}>
          <header className="leading-tight p-2 pb-1">
            <div className="text-xl font-semibold flex items-center justify-center gap-3">
              <span>
                <BsBook />
              </span>
              <span>{book.title}</span>
            </div>
            <div className="  flex items-center gap-1 text-grey-darker text-sm mt-4 px-0 md:px-2 ">
              <BsPen />
              <p className="font-semibold">{book.author}</p>
            </div>
          </header>
        </Link>
        <footer className="flex flex-col gap-1 leading-none px-2 md:px-4 pb-4 ">
          <Link href={`/book/${book._id}`}>
            <div className="flex items-center gap-1 text-sm">
              <BsCalendar2Date />
              <span className="font-semibold">{book.publicationYear}</span>
            </div>
            <div className="text-sm items-center gap-1">
              <div className="flex items-center gap-1 text-sm">
                <MdOutlineDescription />
                <span className="font-semibold">{book.description}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <CiBarcode />
                <span className="font-semibold">{book.isbn}</span>
              </div>
            </div>
          </Link>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    if (setEditingBook) {
                      setEditingBook(book);
                    }
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    deleteBookMutation.mutate(book._id as string);
                  }}
                >
                  {deleteBookMutation.isLoading ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </footer>
      </article>
    </div>
  );
}
