const mongoose = require("mongoose");
const { isEmail } = require("validator");

const bcrypt = require("bcryptjs");
const HASH_ROUND = 12;

let playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email cannot be empty!"],
  },
  name: {
    type: String,
    require: [true, "nama harus diisi"],
    maxlength: [225, "Maximum name length between 3-255 characters!"],
    minlength: [3, "Minimum name length between 3-255 characters!"],
  },
  username: {
    type: String,
    require: [true, "nama harus diisi"],
    maxlength: [225, "Maximum username length between 3-255 characters!"],
    minlength: [3, "Minimum username length between 3-255 characters!"],
  },
  password: {
    type: String,
    require: [true, "Password cannot be empty!"],
    maxlength: [225, "Maximum password length 255 characters!"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  avatar: { type: String },
  fileName: { type: String },
  phoneNumber: {
    type: String,
    require: [true, "Phone number cannot be empty!"],
    maxlength: [13, "Maximum length of phone number is 3 - 13 characters!"],
    minlength: [9, "Minimum length of phone number is 3 - 13 characters!"],
  },

  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} has been register`
);

// before saving do validation
playerSchema.pre("save", function (next) {
  if (!isEmail(this.email)) {
    throw new Error("Invalid email!");
  }
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});
module.exports = mongoose.model("Player", playerSchema);
