const Transaction = require("../models/transaction");
const Voucher = require("../models/voucher");
const Category = require("../models/category");
const Player = require("../models/category");

module.exports = {
  index_dashboard: async (req, res) => {
    try {
      const transaction = await Transaction.countDocuments();
      const voucher = await Voucher.countDocuments();
      const category = await Category.countDocuments();
      const player = await Player.countDocuments();

      res.render("admin/dashboard/view_dashboard", {
        title: "Dashboard page",
        name: req.session.user.name,
        count: {
          transaction,
          category,
          voucher,
          player,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
