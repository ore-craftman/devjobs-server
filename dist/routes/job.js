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
const { addNewJob, getJobById, getAllJobs, updateJob, deleteJob, } = require("../services/job");
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.jobTitle ||
        !req.body.jobType ||
        !req.body.jobPay ||
        !req.body.jobDesc ||
        !req.body.jobRegion ||
        !req.body.applUrl ||
        !req.body.jobReqirements ||
        !req.body.dailyTask ||
        !req.body.companyName ||
        !req.body.companyUrl) {
        return res
            .status(406)
            .send({ status: "Error", message: "Incomplete user input" });
    }
    else {
        const { jobTitle, jobType, jobPay, jobDesc, jobRegion, applUrl, jobReqirements, dailyTask, companyName, companyUrl, } = req.body;
        const job = yield addNewJob(jobTitle, jobType, parseInt(jobPay), jobDesc, jobRegion, applUrl, jobReqirements, dailyTask, companyName, companyUrl);
        return res.send({
            status: typeof job !== "string" ? "OK" : "Error",
            data: job,
        });
    }
}));
router.get("/single/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const job = yield getJobById(id);
    return res.send({
        status: typeof job !== "string" ? "OK" : "Error",
        data: job,
    });
}));
module.exports = router;
//# sourceMappingURL=job.js.map