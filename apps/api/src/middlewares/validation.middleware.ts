import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const bookSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    publicationYear: z.number().min(1),
    isbn: z.string().min(1),
    description: z.string().min(1),
  }),
});

export const validateBook =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      bookSchema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };
