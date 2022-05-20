import express, { Request, Response } from "express";
const router = express.Router();
const {
  createUser,
  authenticateUser,
  getUserById,
  deleteUser,
  verifyUserEmail,
} = require("../services/user");

router.post("/create", async (req: Request, res: Response) => {
  if (
    !req.body.hasOwnProperty("firstname") ||
    !req.body.hasOwnProperty("lastname") ||
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("password") ||
    !req.body.hasOwnProperty("keyMaster")
  ) {
    return res
      .status(406)
      .send({ status: "Client error", message: "Incomplete user input" });
  } else {
    const {
      firstname,
      lastname,
      email,
      keyMaster,
      password,
      companyName,
      companyUrl,
    } = req.body;

    const user = await createUser(
      firstname,
      lastname,
      email,
      keyMaster,
      password,
      companyName,
      companyUrl
    );
    return res.send({
      status: typeof user !== "string" ? "OK" : "Error",
      data: user,
    });
  }
});

router.post("/auth", async (req: Request, res: Response): Promise<Response> => {
  if (
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("password")
  ) {
    return res
      .status(406)
      .send({ status: "Client error", message: "Incomplete user input" });
  } else {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);

    return res.send({
      status: typeof user !== "string" ? "OK" : "Error",
      data: user,
    });
  }
});

router.get(
  "/verify/:userToken",
  async (req: Request, res: Response): Promise<Response> => {
    const { userToken } = req.params;
    const verifiedUser = await verifyUserEmail(userToken);
    return res.send({
      status: typeof verifiedUser !== "string" ? "OK" : "Error",
      message: verifiedUser,
    });
  }
);

router.get(
  "/account/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const user = await getUserById(id);
    return res.send({
      status: typeof user !== "string" ? "OK" : "Error",
      message: user,
    });
  }
);

router.delete(
  "/account/delete/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deteledInstance = await deleteUser(id);
    return res.send({
      status: deteledInstance !== 1 ? "Error" : "OK",
      message:
        deteledInstance !== 1 ? "Account not registed" : "Account deleted",
    });
  }
);

module.exports = router;
