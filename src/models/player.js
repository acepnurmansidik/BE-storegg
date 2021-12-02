const mongoose = require("mongoose");

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
    name: {
      type: String,
      require: [true, "name harus diisi"],
    },
    password: {
      type: String,
      require: [true, "password harus diisi"],
      maxlength: [225, "panjang maximal 225 karakter"],
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
    phoneNumber: {
      type: String,
      minlength: [9, "panjang nama harus antara 9 - 13 karakter"],
      maxlength: [13, "panjang nama harus antara 9 - 13 karakter"],
    },
    username: {
      type: String,
      require: [true, "password harus diisi"],
      maxlength: [225, "panjang maximal 225 karakter"],
    },
    avatar: {
      type: String,
    },
    filename: {
      type: String,
    },
    favorit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  }
);

module.exports = mongoose.model("Player", playerSchema);
