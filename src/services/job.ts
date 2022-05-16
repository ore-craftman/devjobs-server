export {};
const { Job } = require("../models/job");
const mongoose = require("mongoose");

const addNewJob = async (
  jobTitle: string,
  jobType: string,
  jobPay: number,
  jobDesc: string,
  jobRegion: string,
  applUrl: string,
  jobReqirements: string[],
  dailyTask: string[],
  companyName: string,
  companyUrl: string
) => {
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

  const jobInstance = await job.save();

  if (!jobInstance) {
    return "Error adding new job";
  } else {
    return jobInstance;
  }
};

const getJobById = async (id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return "Invalid job id";

  const job = await Job.findById(id).exec();
  if (!job) return "No job with specified Id";
  else return job;
};

const getAllJobs = async () => {
  const jobs = await Job.find({});
  return jobs;
};

const updateJob = async (id: any, newData: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return "Invalid job id";

  const updatedJob = await Job.findOneAndUpdate({ _id: id }, newData, {
    new: true,
  });

  if (!updateJob) return "Error updating job";
  else return updatedJob;
};

const deleteJob = async (id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return "Invalid job id";

  const deletedData = await Job.deleteOne({ _id: id });
  return deletedData.deletedCount;
};

module.exports = { addNewJob, getJobById, getAllJobs, updateJob, deleteJob };
