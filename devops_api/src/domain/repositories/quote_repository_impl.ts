import { QuoteDataSource } from "../../data/interfaces/data_sources/quote_data_source";
import { Quote } from "../entities/quote_entity";
import { QuoteRepository } from "../interfaces/repositories/quote_repository";

export class QuoteRepositoryImpl implements QuoteRepository {
  constructor(private quoteDataSource: QuoteDataSource) {}

  create(quote: Quote): Promise<Quote> {
    const result = this.quoteDataSource.create(quote);
    return result;
  }
  getById(id: string): Promise<Quote> {
    const result = this.quoteDataSource.getById(id);
    return result;
  }
  getAll(): Promise<Quote[]> {
    const result = this.quoteDataSource.getAll();
    return result;
  }
  update(id: string, quote: Quote): Promise<Quote> {
    const result = this.quoteDataSource.update(id, quote);
    return result;
  }
  delete(id: string): Promise<boolean> {
    const result = this.quoteDataSource.delete(id);
    return result;
  }
}
