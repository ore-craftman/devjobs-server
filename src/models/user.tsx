const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    keyMaster: { type: Boolean, required: true },
    companyName: String,
    companyUrl: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
