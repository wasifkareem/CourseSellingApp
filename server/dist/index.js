import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import courseRoute, { addCourse } from "./routes/courses.js";
import authRoute from "./routes/auth.js";
import helmet from "helmet";
import bodyParser from "body-parser";
import multer from "multer";
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
app.use("/assets", express.static("../public/assets"));
//File storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
app.post("/courses/addCourse", upload.fields([{ name: "videoFile" }, { name: "imgFile" }]), addCourse);
app.use("/courses", courseRoute);
app.use("/auth", authRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
