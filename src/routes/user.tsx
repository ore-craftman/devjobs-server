import express, { Request, Response } from "express";
const router = express.Router();
const User = require("../models/user");
const { createUser } = require("../controller/user");

router.post(
  "/create",
  async (req: Request, res: Response): Promise<Response> => {
    const user = new User();
    createUser(req.body);

    // Process req.body then create new user
    return res.send({
      message: "Test User ",
    });
  }
);

module.exports = router;
