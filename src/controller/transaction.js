const Transaction = require("../models/transaction");

module.exports = {
  index_Transaction: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const transaction = await Transaction.find()

      res.render("admin/transaction/view_transaction", {
        title: "Transaction page",
        name: req.session.user.name,
        alert,
        transaction,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/transaction");
    }
  },
};