import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import { BookController } from "@/controllers/book.controller";

export class BooktRoute implements Routes {
  public path = "/books";
  public router = Router();
  public bookController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.bookController.getBooks);
    this.router.post(`${this.path}`, this.bookController.createBook);

    this.router.get(`${this.path}/search`, this.bookController.searchBook);

    this.router.get(`${this.path}/:bookId`, this.bookController.getBookById);
    this.router.put(`${this.path}/:bookId`, this.bookController.updateBookById);
    this.router.delete(
      `${this.path}/:bookId`,
      this.bookController.deleteBookById
    );
  }
}
