const mongoose = require("mongoose");

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "The name of the bank owner cannot be empty"],
  },
  bankName: {
    type: String,
    require: [true, "Bank name cannot be empty!"],
  },
  noRekening: {
    type: String,
    require: [true, "Account number cannot be empty!"],
  },
});

module.exports = mongoose.model("Bank", bankSchema);
