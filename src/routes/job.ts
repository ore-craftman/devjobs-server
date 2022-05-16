import express, { Request, Response } from "express";
const {
  addNewJob,
  getJobById,
  getAllJobs,
  updateJob,
  deleteJob,
} = require("../services/job");

const router = express.Router();

router.post("/add", async (req: Request, res: Response): Promise<Response> => {
  if (
    !req.body.jobTitle ||
    !req.body.jobType ||
    !req.body.jobPay ||
    !req.body.jobDesc ||
    !req.body.jobRegion ||
    !req.body.applUrl ||
    !req.body.jobReqirements ||
    !req.body.dailyTask ||
    !req.body.companyName ||
    !req.body.companyUrl
  ) {
    return res
      .status(406)
      .send({ status: "Error", message: "Incomplete user input" });
  } else {
    const {
      jobTitle,
      jobType,
      jobPay,
      jobDesc,
      jobRegion,
      applUrl,
      jobReqirements,
      dailyTask,
      companyName,
      companyUrl,
    } = req.body;

    const job = await addNewJob(
      jobTitle,
      jobType,
      parseInt(jobPay),
      jobDesc,
      jobRegion,
      applUrl,
      jobReqirements,
      dailyTask,
      companyName,
      companyUrl
    );

    return res.send({
      status: typeof job !== "string" ? "OK" : "Error",
      data: job,
    });
  }
});

router.get(
  "/single/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const job = await getJobById(id);
    return res.send({
      status: typeof job !== "string" ? "OK" : "Error",
      data: job,
    });
  }
);

router.get("/jobs", async (req: Request, res: Response): Promise<Response> => {
  const jobs = await getAllJobs();
  return res.send({ status: "OK", data: jobs });
});

router.post(
  "/update",
  async (req: Request, res: Response): Promise<Response> => {
    const { id, newData } = req.body;

    const updatedJob = await updateJob(id, newData);
    return res.send({
      status: typeof updatedJob !== "string" ? "OK" : "Error",
      data: updatedJob,
    });
  }
);

router.delete(
  "/delete/single/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedJob = await deleteJob(id);

    return res.send({
      status: deletedJob == 1 ? "OK" : "Error",
      data: deletedJob == 1 ? "Deleted" : "Error deleting job",
    });
  }
);

module.exports = router;
