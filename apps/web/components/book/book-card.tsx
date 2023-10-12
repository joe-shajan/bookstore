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
import type { InterfaceBook } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InterfaceBookCard {
  book: InterfaceBook;
}

function BookCard({ book }: InterfaceBookCard): JSX.Element {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
      <Link href={`/book/${book.id}`}>
        <article className="bg-gray-50 overflow-hidden rounded-lg shadow-md hover:shadow-lg border-slate-100 border p-3 md:p-0 text-slate-700">
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

          <footer className="flex flex-col gap-1 leading-none px-2 md:px-4 pb-4 ">
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
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDotsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </footer>
        </article>
      </Link>
    </div>
  );
}

export default BookCard;
