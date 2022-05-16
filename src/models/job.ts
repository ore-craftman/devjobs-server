export {};
const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    jobType: { type: String, required: true },
    jobPay: { type: Number, required: true },
    jobDesc: { type: String, required: true },
    jobRegion: { type: String, required: true },
    applUrl: { type: String, required: true },
    jobReqirements: { type: [String], required: true },
    dailyTask: { type: [String], required: true },
    companyName: { type: String, required: true },
    companyUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = { Job };
