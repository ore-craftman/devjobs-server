"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const dbURI = process.env.MONGODB_URI;
const baseUrl = process.env.BASE_URL;
// Cors Handler
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Body Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes Handler
const userRoutes = require("./routes/user");
app.use(`/${baseUrl}/users`, userRoutes);
// Server && DB Handler
try {
    app.listen(port, () => {
        console.log(`⚡️[server]: Live @ https://localhost:${port}`);
        mongoose.set("bufferCommands", false);
        mongoose.connect(dbURI, (err) => {
            if (err) {
                console.log("DB Connection Err", err);
            }
            console.log(`⚡️[Datase]: Connected`);
        });
    });
}
catch (error) {
    console.error(`Error occured: ${error.message}`);
}
//# sourceMappingURL=index.js.map