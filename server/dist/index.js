"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const courses_js_1 = __importDefault(require("./routes/courses.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
dotenv_1.default.config();
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, cors_1.default)({ origin: "*", methods: "GET,PUT,POST,DELETE" }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "30mb" }));
mongoose_1.default
    .connect(String(process.env.MONGO_URL))
    .then(() => console.log("DB is online"))
    .catch((err) => {
    console.log(err);
});
app.use("/courses", courses_js_1.default);
app.use("/auth", auth_js_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
