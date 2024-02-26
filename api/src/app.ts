import express from "express";
import * as dotevnv from "dotenv";
import { quoteRouter } from "./quotes/quotes.routes";

// see: https://dev.to/realsteveig/nodejs-and-typescript-tutorial-build-a-rest-api-with-typescript-nodejs-and-a-file-based-storage-system-2l61

let PORT = 8080;

dotevnv.config();

if (!process.env.PORT) {
  console.log(`No port was specifically specified. Defaulting to ${PORT}`);
} else {
  PORT = parseInt(process.env.PORT as string, 10);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", quoteRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
