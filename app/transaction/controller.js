const Transaction = require("./model");

module.exports = {
  index_Transaction: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const transaction = await Transaction.find().populate("player");

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
  actionStatusTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Transaction.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", `Successfult update status`);
      req.flash("alertStatus", `success`);
      res.redirect("/transaction");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/transaction");
    }
  },
  viewDetailTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const transaction = await Transaction.findOne({ _id: id });
      console.log(transaction);

      res.render("admin/transaction/detail", {
        title: "Transaction detail page",
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
