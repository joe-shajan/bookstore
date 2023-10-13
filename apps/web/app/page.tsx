"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { getAllBooks } from "@/services";
import { useModal } from "@/hooks";
import type { InterfaceBook } from "@/types";
import {
  Modal,
  BookCard,
  Pagination,
  Loader,
  Button,
  CreateBook,
} from "@/components/index";
import { updateTotalBooks, useAppDispatch, useAppSelector } from "@/redux";

export default function Page(): JSX.Element {
  const { isOpen, toggle, openModal, closeModal } = useModal();
  const [editingBook, setEditingBook] = useState<InterfaceBook | null>(null);

  const currentPage = useAppSelector((state) => state.paginationReducer);
  const dispatch = useAppDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["books", currentPage.page],
    queryFn: () => getAllBooks(currentPage.page),
  });

  useEffect(() => {
    if (editingBook) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeModal, editingBook, openModal]);

  if (data?.bookCount) {
    dispatch(updateTotalBooks(data?.bookCount));
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <CreateBook
          editingBook={editingBook}
          refetch={refetch}
          setEditingBook={setEditingBook}
          toggle={toggle}
        />
      </Modal>
      <div className="flex md:flex-row flex-col md:justify-between md:items-center px-4 md:px-12 lg:px-28 pt-5 pb-5 bg-slate-50 shadow-sm">
        <div className="text-2xl font-semibold text-center md:text-left md:mb-0 mb-6">
          All Books
        </div>
        <div className="flex justify-end">
          <div className="flex gap-3 justify-end">
            <Link href="/search">
              <Button className="bg-slate-200 text-black hover:bg-slate-300">
                Search books
              </Button>
            </Link>
            <Button onClick={toggle}>Add New Book</Button>
          </div>
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
          ) : data?.books.length ? (
            <>
              {data.books.map((book) => (
                <BookCard
                  book={book}
                  key={book._id}
                  refetch={refetch}
                  setEditingBook={setEditingBook}
                />
              ))}
              <div className="flext justify-center w-full">
                <Pagination />
              </div>
            </>
          ) : (
            <div className="text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
              No books found create new.
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}
