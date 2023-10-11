"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Course_js_1 = __importDefault(require("../models/Course.js"));
const router = express_1.default.Router();
//GET ALL COURSES
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = (yield Course_js_1.default.find()).reverse();
        res.status(200).json(courses);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
//GET COURSES BY ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_js_1.default.findById(req.params.id);
        res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
//DELETE COURSE BY ID
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_js_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
//UPDATE COURSE BY ID
router.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_js_1.default.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img,
            price: req.body.price,
            educatorId: req.body.educatorId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        console.log("hello");
    }
}));
//GET MY COURSES
router.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = (yield Course_js_1.default.find({ educatorId: req.params.id })).reverse();
        res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
//CREATE COURSES
router.post("/addCourse", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = new Course_js_1.default(req.body);
    try {
        const savedCourse = yield newCourse.save();
        res.status(200).json(savedCourse);
    }
    catch (err) {
        console.log("hello");
        res.status(500).json(err);
    }
}));
exports.default = router;
