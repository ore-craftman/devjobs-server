"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const { User } = require("../models/user");
const mongoose = require("mongoose");
const mailer = require("./mailer");
const createUser = (firstname, lastname, email, keyMaster, password, companyName, companyUrl) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield User.exists({ email: email })) {
        return "Account already exist";
    }
    else {
        const user = new User();
        const salt = crypto.randomBytes(16).toString("hex");
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.keyMaster = keyMaster;
        user.status = false;
        companyName ? (user.companyName = companyName) : null;
        companyUrl ? (user.companyUrl = companyUrl) : null;
        user.salt = salt;
        user.hash = crypto
            .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
            .toString(`hex`);
        user.token = crypto
            .pbkdf2Sync(user.hash, salt, 1000, 64, `sha512`)
            .toString(`hex`);
        const userInstace = yield user.save();
        if (!userInstace) {
            return "Error creating account";
        }
        else {
            // ! COMPLETE MAILER's ACTION
            const env = process.env.ENVIROMENT;
            mailer(email, "Email Verification | DevJobs", `Click the link below to verify your email address <br/> ${env == "local" ? "localhost:3000" : "https://devjobs-xi.vercel.app"}/verify/${user.token}`);
            return userInstace;
        }
    }
});
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email: email });
    if (!user) {
        return "Invalid email address";
    }
    else {
        if (user.hash !==
            crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`)) {
            return "Wrong Password";
        }
        else {
            return user;
        }
    }
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose.Types.ObjectId.isValid(id))
        return "Invalid user id";
    const user = yield User.findById(id).exec();
    if (!user)
        return "No account with specified Id";
    else
        return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose.Types.ObjectId.isValid(id))
        return "Invalid user id";
    const deletedData = yield User.deleteOne({ _id: id });
    return deletedData.deletedCount;
});
module.exports = { createUser, authenticateUser, getUserById, deleteUser };
//# sourceMappingURL=user.js.map