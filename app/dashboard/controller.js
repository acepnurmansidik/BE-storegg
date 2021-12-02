const Transaction = require("../transaction/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Player = require("../player/model");

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
