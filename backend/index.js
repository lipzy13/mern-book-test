import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js";
const app = express();
app.use(express.json());

app.use(cors({}));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use("/books", booksRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("DB Connect");
    app.listen(PORT, () => {
      console.log(`App is listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
