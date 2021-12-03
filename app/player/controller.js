const Voucher = require("../voucher/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find()
        .select("_id name status category thumbnail")
        .populate("category");

      res.status(200).json({ data: voucher });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });
      res.status(200).json({ data: voucher });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
