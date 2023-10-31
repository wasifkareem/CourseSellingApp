import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import courseRoute, { addCourse } from "./routes/courses.js";
import authRoute from "./routes/auth.js";
import helmet from "helmet";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import Multer from "multer";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(express.json());

mongoose
  .connect(String(process.env.MONGO_URL))
  .then(() => console.log("DB is online"))
  .catch((err) => {
    console.log(err);
  });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
});

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

app.post("/courses/addCourse", upload.fields([]), addCourse);
app.use("/courses", courseRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
