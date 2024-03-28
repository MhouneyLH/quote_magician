import { MongoDBAtlasQuoteDataSource } from "../../../src/data/data_sources/mongodb_atlas_quote_data_source";
import { DatabaseWrapper } from "../../../src/data/interfaces/data_sources/database_wrapper";

describe("MongoDBAtlas QuoteDataSource", () => {
  let database: DatabaseWrapper;

  beforeAll(() => {
    database = {
      find: jest.fn(),
      insertOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    test("should call insertOne with the quote and return the created quote", async () => {
      const ds = new MongoDBAtlasQuoteDataSource(database);
      const expectedQuote = { id: "1", text: "test", author: "test", likeCount: 1 };
      jest.spyOn(database, "insertOne").mockImplementation(() => Promise.resolve(expectedQuote));

      const result = await ds.create(expectedQuote);

      expect(database.insertOne).toHaveBeenCalledWith({
        id: "1",
        text: "test",
        author: "test",
        likeCount: 1,
      });
      expect(result).toStrictEqual(expectedQuote);
    });
  });

  describe("getById", () => {
    test("should call find with the id and return the quote", async () => {
      const ds = new MongoDBAtlasQuoteDataSource(database);
      const expectedQuote = { id: "1", text: "test", author: "test", likeCount: 1 };
      jest.spyOn(database, "find").mockImplementation(() => Promise.resolve(expectedQuote));

      const result = await ds.getById("1");

      expect(database.find).toHaveBeenCalledWith({ id: "1" });
      expect(result).toStrictEqual(expectedQuote);
    });
  });

  describe("getAll", () => {
    test("should call find with an empty object and return the quotes", async () => {
      const ds = new MongoDBAtlasQuoteDataSource(database);
      const expectedQuotes = [{ id: "1", text: "test", author: "test", likeCount: 1 }];
      jest.spyOn(database, "find").mockImplementation(() => Promise.resolve(expectedQuotes));

      const result = await ds.getAll();

      expect(database.find).toHaveBeenCalledWith({});
      expect(result).toStrictEqual(expectedQuotes);
    });
  });

  describe("update", () => {
    test("should call updateOne with the id and quote and return the updated quote", async () => {
      const ds = new MongoDBAtlasQuoteDataSource(database);
      const expectedQuote = { id: "1", text: "test", author: "test", likeCount: 1 };
      jest.spyOn(database, "updateOne").mockImplementation(() => Promise.resolve(expectedQuote));

      const result = await ds.update("1", expectedQuote);

      expect(database.updateOne).toHaveBeenCalledWith("1", expectedQuote);
      expect(result).toStrictEqual(expectedQuote);
    });
  });

  describe("delete", () => {
    test("should call deleteOne with the id and return true", async () => {
      const ds = new MongoDBAtlasQuoteDataSource(database);
      jest.spyOn(database, "deleteOne").mockImplementation(() => Promise.resolve(true));

      const result = await ds.delete("1");

      expect(database.deleteOne).toHaveBeenCalledWith("1");
      expect(result).toBe(true);
    });
  });
});
