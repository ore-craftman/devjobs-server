import * as crypto from "crypto";
const { User } = require("../models/user");

const createUser = async (
  firstname: string,
  lastname: string,
  email: string,
  keyMaster: boolean,
  password: string,
  companyName?: string | undefined,
  companyUrl?: string | undefined
) => {
  if (await User.exists({ email: email })) {
    return "Account already exist";
  } else {
    const user = new User();
    const salt = crypto.randomBytes(16).toString("hex");

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.keyMaster = keyMaster;
    companyName ? (user.companyName = companyName) : null;
    companyUrl ? (user.companyUrl = companyUrl) : null;

    user.salt = salt;
    user.hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    const userInstace = await user.save();

    if (!userInstace) {
      return "Error creating account";
    } else {
      return userInstace;
    }
  }
};

module.exports = { createUser };
