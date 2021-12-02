// const Player = require("../player/model")
const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "Game name is required"] },
      category: { type: String, require: [true, "Category is required"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "Coin name is required"] },
      coinQuantity: {
        type: String,
        require: [true, "Coin amount is required"],
      },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, "Name is required"] },
      type: { type: String, require: [true, "Type payment is required"] },
      bankName: { type: String, require: [true, "Bank name is required"] },
      noRekening: {
        type: String,
        require: [true, "Account number is required"],
      },
    },
    // nama player
    name: {
      type: String,
      require: [true, "Name is required"],
      maxlength: [225, "Max length name 3 - 355 karakter"],
      minlength: [3, "Min length name 3 - 355 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "Name is required"],
      maxlength: [225, "Max lenght 3 - 355 karakter"],
      minlength: [3, "Min length 3 - 355 karakter"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    // value total harga keseluruhan dari harga + pajak
    value: {
      type: Number,
      default: 0,
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: { type: String, require: [true, "Player name is required"] },
      phoneNumber: {
        type: Number,
        require: [true, "Account name is required"],
        maxlength: [13, "Max length 9 - 13 karakter"],
        minlength: [9, "Min length 9 - 13 karakter"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
