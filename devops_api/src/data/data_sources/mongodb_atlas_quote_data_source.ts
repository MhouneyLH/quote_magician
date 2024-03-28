import { Quote } from "../../domain/entities/quote_entity";
import { DatabaseWrapper } from "../interfaces/data_sources/database_wrapper";
import { QuoteDataSource } from "../interfaces/data_sources/quote_data_source";

export class MongoDBAtlasQuoteDataSource implements QuoteDataSource {
  constructor(private database: DatabaseWrapper) {}

  async create(quote: Quote): Promise<Quote> {
    const result = await this.database.insertOne(quote);
    return result;
  }

  async getById(id: string): Promise<Quote> {
    const result = await this.database.find({ id });
    return result;
  }

  async getAll(): Promise<Quote[]> {
    const result = await this.database.find({});
    return result;
  }

  async update(id: string, quote: Quote): Promise<Quote> {
    const result = await this.database.updateOne(id, quote);
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.database.deleteOne(id);
    return result;
  }
}
