const Payment = require("../models/payment");
const Bank = require("../models/bank");

module.exports = {
  indexPayment: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const payment = await Payment.find().populate("banks");

      res.render("admin/payment/view_payment", {
        title: "Payment page",
        name: req.session.user.name,
        alert,
        payment,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  viewCreatePayment: async (req, res) => {
    try {
      const banks = await Bank.find();

      res.render("admin/payment/create", {
        title: "Payment | Create",
        name: req.session.user.name,
        banks,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionCreatePayment: async (req, res) => {
    try {
      const { type, banks } = req.body;
      let payment = await Payment({ type, banks });

      await payment.save();

      req.flash("alertMessage", `successfully created payment`);
      req.flash("alertStatus", `success`);
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  viewEditPayment: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findOne({ _id: id });
      const banks = await Bank.find();

      res.render("admin/payment/edit", {
        title: "Payment | Edit",
        name: req.session.user.name,
        payment,
        banks,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionEditPayment: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { type, banks });

      req.flash("alertMessage", `Payment edit successfully`);
      req.flash("alertStatus", `success`);
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionDeletePayment: async (req, res) => {
    try {
      const { id } = req.params;

      await Payment.findOneAndRemove({ _id: id });

      req.flash("alertMessage", `successfully deleted payment`);
      req.flash("alertStatus", `success`);
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionStatusPayment: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id });
      const status = payment.status === "Y" ? "N" : "Y";

      await Payment.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", `successfully edit status`);
      req.flash("alertStatus", `success`);
      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
};
