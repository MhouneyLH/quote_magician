import { Quote } from "../../../entities/quote_entity";

export interface UpdateQuoteUseCase {
  execute(quote: Quote): Promise<Quote | null>;
}
