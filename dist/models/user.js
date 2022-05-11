const { mongoose } = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedKey: { type: String, required: true },
    salt: { type: String, required: true },
    keyMaster: { type: Boolean, required: true },
    companyName: { type: String, required: false },
    companyUrl: { type: String, required: false },
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map