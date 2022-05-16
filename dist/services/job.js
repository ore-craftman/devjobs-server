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
Object.defineProperty(exports, "__esModule", { value: true });
const { Job } = require("../models/job");
const mongoose = require("mongoose");
const addNewJob = (jobTitle, jobType, jobPay, jobDesc, jobRegion, applUrl, jobReqirements, dailyTask, companyName, companyUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const job = new Job();
    job.jobTitle = jobTitle;
    job.jobType = jobType;
    job.jobPay = jobPay;
    job.jobDesc = jobDesc;
    job.jobRegion = jobRegion;
    job.applUrl = applUrl;
    job.jobReqirements = jobReqirements;
    job.dailyTask = dailyTask;
    job.companyName = companyName;
    job.companyUrl = companyUrl;
    const jobInstance = yield job.save();
    if (!jobInstance) {
        return "Error adding new job";
    }
    else {
        return jobInstance;
    }
});
const getJobById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose.Types.ObjectId.isValid(id))
        return "Invalid job id";
    const job = yield Job.findById(id).exec();
    if (!job)
        return "No job with specified Id";
    else
        return job;
});
const getAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield Job.find({});
    return jobs;
});
const updateJob = (id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose.Types.ObjectId.isValid(id))
        return "Invalid job id";
    const updatedJob = yield Job.findOneAndUpdate({ _id: id }, newData, {
        new: true,
    });
    if (!updateJob)
        return "Error updating job";
    else
        return updatedJob;
});
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose.Types.ObjectId.isValid(id))
        return "Invalid job id";
    const deletedData = yield Job.deleteOne({ _id: id });
    return deletedData.deletedCount;
});
module.exports = { addNewJob, getJobById, getAllJobs, updateJob, deleteJob };
//# sourceMappingURL=job.js.map