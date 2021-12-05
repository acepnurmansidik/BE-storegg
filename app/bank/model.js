const mongoose = require("mongoose");

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "The name of the bank owner cannot be empty"],
  },
  bankName: {
    type: String,
    require: [true, "Bank name is required"],
  },
  noRekening: {
    type: String,
    require: [true, "Account number is required"],
  },
});

module.exports = mongoose.model("Bank", bankSchema);
