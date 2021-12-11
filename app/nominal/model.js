const mongoose = require("mongoose");

let nominalSchema = mongoose.Schema({
  coinName: {
    type: String,
    require: [true, "Nominal name cannot be empty!"],
  },
  coinQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Nominal", nominalSchema);
