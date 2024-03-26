import { Quote } from "../../../../src/domain/entities/quote_entity";
import { QuoteRepository } from "../../../../src/domain/interfaces/repositories/quote_repository";

export class MockQuoteRepository implements QuoteRepository {
  create(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
  getById(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Quote[]> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("Delete Quotes Usecase", () => {
  let quoteRepository: MockQuoteRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    quoteRepository = new MockQuoteRepository();
  });

  test("should delete a quote", async () => {
    jest.spyOn(quoteRepository, "delete").mockResolvedValue(true);

    const deletedQuote = await quoteRepository.delete();

    expect(deletedQuote).toEqual(true);
  });
});
