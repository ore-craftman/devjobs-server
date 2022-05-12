import express, { Request, Response } from "express";
const router = express.Router();
const { createUser } = require("../services/user");

router.post(
  "/create",
  async (req: Request, res: Response): Promise<Response> => {
    if (
      !req.body.hasOwnProperty(
        "firstname" && "lastname" && "email" && "keyMaster" && "password"
      )
    ) {
      return res
        .status(406)
        .send({ status: "client error", message: "Incomplete user input" });
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
        message: user,
      });
    }
  }
);

module.exports = router;
