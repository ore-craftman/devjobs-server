import * as crypto from "crypto";
const { User } = require("../models/user");
const mongoose = require("mongoose");

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

const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return "Invalid email address";
  } else {
    if (
      user.hash !==
      crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`)
    ) {
      return "Wrong Password";
    } else {
      return user;
    }
  }
};

const getUserById = async (id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return "Invalid user id";
  const user = await User.findById(id).exec();
  if (!user) return "No account with specified Id";
  else return user;
};

const deleteUser = async (id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return "Invalid user id";

  const deletedData = await User.deleteOne({ _id: id });
  return deletedData.deletedCount;
};

module.exports = { createUser, authenticateUser, getUserById, deleteUser };
