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
const router = express_1.default.Router();
const { createUser, authenticateUser, getUserById, deleteUser, } = require("../services/user");
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.hasOwnProperty("firstname" && "lastname" && "email" && "keyMaster" && "password")) {
        return res
            .status(406)
            .send({ status: "Client error", message: "Incomplete user input" });
    }
    else {
        const { firstname, lastname, email, keyMaster, password, companyName, companyUrl, } = req.body;
        const user = yield createUser(firstname, lastname, email, keyMaster, password, companyName, companyUrl);
        return res.send({
            status: typeof user !== "string" ? "OK" : "Error",
            message: user,
        });
    }
}));
router.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.hasOwnProperty("email" && "password")) {
        return res
            .status(406)
            .send({ status: "Client error", message: "Incomplete user input" });
    }
    else {
        const { email, password } = req.body;
        const user = yield authenticateUser(email, password);
        return res.send({
            status: typeof user !== "string" ? "OK" : "Error",
            message: user,
        });
    }
}));
router.get("/account/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield getUserById(id);
    return res.send({
        status: typeof user !== "string" ? "OK" : "Error",
        message: user,
    });
}));
router.delete("/account/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deteledInstance = yield deleteUser(id);
    return res.send({
        status: deteledInstance !== 1 ? "Error" : "OK",
        message: deteledInstance !== 1 ? "Account not registed" : "Account deleted",
    });
}));
module.exports = router;
//# sourceMappingURL=user.js.map