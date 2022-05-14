const supertest = require("supertest");
const app = require("../dist/index");
const testDB = require("./config/database");
const request = supertest(app);
const baseUrl = "/api/users";

beforeAll(async () => {
  // jest.setTimeout(60000);
  await testDB.connect();
});
afterAll(async () => await testDB.close());

describe("Users Route", () => {
  test("Should recieve required params", async () => {
    const res = await request
      .post(`${baseUrl}/create`)
      .send({ firstname: "Ade" });

    expect(res.status).toEqual(406);
    expect(res.body.status).toBe("Client error");
  });

  test("Should write new user to the database", async () => {
    const res = await request.post(`${baseUrl}/create`).send({
      firstname: "super",
      lastname: "user",
      email: "superdo@test.com",
      password: "superdo123",
      keyMaster: false,
    });

    expect(res.body.status).toBe("OK");
  });

  test("Should check dublicate email", async () => {
    const res = await request.post(`${baseUrl}/create`).send({
      firstname: "super",
      lastname: "user",
      email: "superdo@test.com",
      password: "superdo123",
      keyMaster: false,
    });

    expect(res.status).toEqual(200);
    expect(res.body.status).toBe("Error");
  });

  test("Should login with valid auth credentials", async () => {
    const res = await request
      .post(`${baseUrl}/auth`)
      .send({ email: "superdo@test.com", password: "superdo123" });

    expect(res.body.status).toBe("OK");
  });

  test("Should throw error with invalid auth email", async () => {
    const res = await request
      .post(`${baseUrl}/auth`)
      .send({ email: "notsuperdo@test.com", password: "superdo123" });

    expect(res.body.status).toBe("Error");
  });

  test("Should throw error with invalid auth password", async () => {
    const res = await request
      .post(`${baseUrl}/auth`)
      .send({ email: "superdo@test.com", password: "notsuperdo123" });

    expect(res.body.status).toBe("Error");
  });
});
