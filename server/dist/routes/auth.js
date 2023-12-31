var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import express from "express";
const router = express.Router();
//REGISTER
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = yield newUser.save();
        res.status(200).json(savedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (!user) {
            res.status(500).json("Invalid Credentials!");
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.log("hello");
    }
}));
export default router;
