const supertest = require("supertest");
const app = require("../dist/index");
const testDB = require("./config/database");
const request = supertest(app);
const baseUrl = "/api/job";

beforeAll(async () => {
  await testDB.connect();
});
afterAll(async () => await testDB.close());

describe("Job Route", () => {
  test("Should validate params", async () => {
    const res = await request
      .post(`${baseUrl}/add`)
      .send({ jobTitle: "Lorem Ipsum" });

    expect(res.status).toEqual(406);
    expect(res.body.status).toBe("Error");
  });

  test("Should create job with valid params", async () => {
    const res = await request.post(`${baseUrl}/add`).send({
      jobTitle: "Frontend Engineer II",
      jobType: "Full time",
      jobPay: 3500,
      applUrl: "meta.com/career/job",
      companyName: "meta",
      companyUrl: "meta.com",
      jobRegion: "remote only",
      jobDesc: "lorem ipsum",
      dailyTask: "Work with Senior engineers",
      jobReqirements: "React js",
    });

    expect(res.status).toEqual(200);
    expect(res.body.status).toBe("OK");
  });
});
