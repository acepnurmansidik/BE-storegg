const Voucher = require("../models/voucher");

module.exports = {
  landingPage: async (req, res) => {
    try {
      // cari kategori di voucher
      // select berfungsi untuk memilih data yang kita perlukan dari collection
      const voucher = await Voucher.find()
        .select("_id name status category thumbnail")
        .populate("category");

      res.status(200).json({ data: voucher });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
};
