import { Quote } from "../../entities/quote_entity";

export interface QuoteRepository {
  create(quote: Quote): Promise<Quote>;
  getById(id: string): Promise<Quote | null>;
  getAll(): Promise<Quote[]>;
  update(quote: Quote): Promise<Quote | null>;
  delete(id: string): Promise<boolean>;
}
