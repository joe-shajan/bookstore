"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { axios } from "@/lib/axios";
import type { InterfaceBook } from "@/types";

const validationSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  author: z.string().min(1, { message: "author is required" }),
  publicationYear: z
    .number()
    .min(1, { message: "publication year is required" }),
  isbn: z.string().min(1, { message: "isbn is required" }),
  description: z.string().min(1, { message: "description is required" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface InterfaceCreateBookFormProps {
  toggle: () => void;
  refetch: () => void;
  setEditingBook: (book: InterfaceBook | null) => void;
  editingBook: InterfaceBook | null;
}

export function CreateBookForm({
  toggle,
  editingBook,
  refetch,
  setEditingBook,
}: InterfaceCreateBookFormProps): JSX.Element {
  // const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ValidationSchema>({
    // @ts-ignore
    resolver: zodResolver(validationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ValidationSchema) => {
      return axios.post("/books", data);
    },
    onSuccess: () => {
      toast.success("book created successfully");
      // queryClient.setQueryData(["books"], (oldData: any) => [
      //   ...oldData,
      //   data.createdbook,
      // ]);
      refetch();
      toggle();
    },
    onError: (error) => {
      console.log(error);
      toast.error("book creation failed");
    },
  });

  const editBookMutation = useMutation({
    mutationFn: (data: ValidationSchema) => {
      return axios.put(`/books/${editingBook?._id}`, data);
    },
    onSuccess: () => {
      // queryClient.setQueryData(["books"], (oldData: any) => {
      //   const filteredData = oldData.books.filter(
      //     (book: any) => book.id !== data.updatedbook.id
      //   );

      //   return [...filteredData, data.updatedbook];
      // });
      toggle();
      refetch();
      setEditingBook(null);
      toast.success("book updated successfully");
    },
    onError: (error) => {
      console.log(error);

      toast.error("Could not update book");
    },
  });

  useEffect(() => {
    if (editingBook) {
      setValue("title", editingBook.title as string);
      setValue("author", editingBook.author as string);
      setValue("publicationYear", editingBook.publicationYear as number);
      setValue("isbn", editingBook.isbn as string);
      setValue("description", editingBook.description as string);
    }
  }, [editingBook]);

  return (
    <form
      className="px-8 pt-6 pb-2 mb-4"
      onSubmit={handleSubmit((formData) => {
        if (editingBook) {
          editBookMutation.mutate(formData);
        } else {
          mutation.mutate(formData);
        }
      })}
    >
      <div className="mb-4 md:mr-2">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.title && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="title"
          placeholder="book title"
          type="text"
          {...register("title")}
        />
        {errors.title ? (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.title.message}
          </p>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="author"
        >
          Author
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.author && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="author"
          placeholder="book author"
          type="text"
          {...register("author")}
        />
        {errors.author ? (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.author.message}
          </p>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.description && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="description"
          placeholder="description"
          type="text"
          {...register("description")}
        />
        {errors.description ? (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.description.message}
          </p>
        ) : null}
      </div>
      <div className="mb-6 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="isbn"
          >
            ISBN
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.isbn && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="isbn"
            placeholder="978-1-234567-89-0"
            type="text"
            {...register("isbn")}
          />
          {errors.isbn ? (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.isbn.message}
            </p>
          ) : null}
        </div>

        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="publicationYear"
          >
            Publication Year
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.publicationYear && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="publicationYear"
            placeholder="2018"
            type="number"
            {...register("publicationYear", {
              setValueAs: (value) => Number(value),
            })}
          />
          {errors.publicationYear ? (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.publicationYear.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="text-center">
        <Button className="w-full " type="submit">
          {editingBook ? (
            editBookMutation.isLoading ? (
              <Loader />
            ) : (
              "Update Book"
            )
          ) : mutation.isLoading ? (
            <Loader />
          ) : (
            "Add Book"
          )}
        </Button>
      </div>
    </form>
  );
}

interface CreateBookProps {
  toggle: () => void;
  setEditingBook: (book: InterfaceBook | null) => void;
  editingBook: InterfaceBook | null;
  refetch: () => void;
}

export function CreateBook({
  toggle,
  setEditingBook,
  ...props
}: CreateBookProps): JSX.Element {
  return (
    <div className="max-w-xl mx-auto my-auto py-4 w-full">
      <div className="flex justify-center">
        <div className="w-full lg:w-11/12">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-lg font-semibold">Create New book</h3>
            <Button
              className="text-lg cursor-pointer hover:bg-slate-100 bg-white p-1  text-black rounded-full"
              onClick={() => {
                toggle();
                setEditingBook(null);
              }}
            >
              <AiOutlineClose />
            </Button>
          </div>
          <CreateBookForm
            setEditingBook={setEditingBook}
            toggle={toggle}
            {...props}
          />
        </div>
      </div>
    </div>
  );
}
