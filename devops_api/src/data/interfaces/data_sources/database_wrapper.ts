export interface DatabaseWrapper {
  insertOne(doc: any): Promise<any>;
  find(query: object): Promise<any>;
  updateOne(id: string, data: object): Promise<any>;
  deleteOne(id: string): Promise<any>;
}
