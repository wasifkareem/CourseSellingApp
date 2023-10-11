import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import courseRoute from "./routes/courses.js";
import authRoute from "./routes/auth.js";
import helmet from "helmet";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({ origin: "*", methods: "GET,PUT,POST,DELETE" }));
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb" }));

mongoose
  .connect(String(process.env.MONGO_URL))
  .then(() => console.log("DB is online"))
  .catch((err) => {
    console.log(err);
  });

app.use("/courses", courseRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
