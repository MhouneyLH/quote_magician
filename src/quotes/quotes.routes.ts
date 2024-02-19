import express, { Request, Response } from "express";
import { UnitQuote, Quote } from "./quote.interface";
import { StatusCodes } from "http-status-codes";

export const quoteRouter = express.Router();

quoteRouter.get("/quotes", async (req: Request, res: Response) => {
  try {
    const allQuotes: UnitQuote[] = [
      {
        id: "123456789",
        auhtor: "Lucas",
        text: "Hoch lebe der Kasche Krieger Klub!",
        likeCount: 100,
      },
      {
        id: "69",
        auhtor: "Danny",
        text: "Hoch lebe der Kasche Krieger Klub2!",
        likeCount: 100,
      },
    ];

    return res.status(StatusCodes.OK).json({ allQuotes });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});
