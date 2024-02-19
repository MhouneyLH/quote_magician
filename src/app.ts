import express from "express";
import * as dotevnv from "dotenv";

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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
