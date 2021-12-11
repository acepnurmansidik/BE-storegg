// const Player = require("../player/model")
const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "Game name cannot be empty"] },
      category: { type: String, require: [true, "Category cannot be empty"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "Coin name cannot be empty"] },
      coinQuantity: {
        type: String,
        require: [true, "Coin amount cannot be empty"],
      },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, "Name cannot be empty"] },
      type: { type: String, require: [true, "Type payment cannot be empty"] },
      bankName: { type: String, require: [true, "Bank name cannot be empty"] },
      noRekening: {
        type: String,
        require: [true, "Account number cannot be empty"],
      },
    },
    // nama player
    name: {
      type: String,
      require: [true, "Name cannot be empty"],
      maxlength: [225, "Max length name 3 - 355 karakter"],
      minlength: [3, "Min length name 3 - 355 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "Name cannot be empty"],
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
      name: { type: String, require: [true, "Player name cannot be empty"] },
      phoneNumber: {
        type: Number,
        require: [true, "Account name cannot be empty"],
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
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
