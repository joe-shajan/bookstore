import { NextFunction, Request, Response } from "express";
import { BookService } from "@/services/book.service";

export class BookController {
  public controller = new BookService();

  public createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const createdbook = await this.controller.createBook(req.body);
      res.json({ createdbook });
    } catch (error) {
      next(error);
    }
  };

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? +req.query.page : 0;

    try {
      const data = await this.controller.getBooks(page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
  public getBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { bookId } = req.params;

    try {
      const data = await this.controller.getBookById(bookId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public updateBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { bookId } = req.params;

    try {
      const data = await this.controller.updateBookById(bookId, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public deleteBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { bookId } = req.params;

    try {
      const data = await this.controller.deleteBookById(bookId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public searchBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { query } = req.query;

    try {
      const data = await this.controller.searchBook(query as string);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}
