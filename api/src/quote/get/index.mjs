import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "quotesDB";

export const handler = async (event, context) => {
  const quoteId = event["params"]["querystring"]["id"];
  const dbRequest = {
    TableName: tableName,
    Key: {
      id: quoteId,
    },
  };

  const dbResponse = await dynamo.send(new GetCommand(dbRequest));
  const response = {
    statusCode: dbResponse["$metadata"]["httpStatusCode"],
    body: JSON.stringify(dbResponse["Item"]),
  };

  return response;
};
