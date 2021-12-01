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
  //   viewEditPayment: async (req, res) => {
  //     try {
  //       const { id } = req.params;

  //       let Payment = await Payment.findOne({ _id: id });

  //       res.render("admin/Payment/edit", {
  //         title: "Payment | Edit",
  //         Payment,
  //       });
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", `danger`);
  //       res.redirect("/Payment");
  //     }
  //   },
  //   actionEditPayment: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { name, namePayment, noRekening } = req.body;

  //       await Payment.findOneAndUpdate({ _id: id }, { name, namePayment, noRekening });

  //       req.flash("alertMessage", `Payment edit successfully`);
  //       req.flash("alertStatus", `success`);
  //       res.redirect("/Payment");
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", `danger`);
  //       res.redirect("/Payment");
  //     }
  //   },
  //   actionDeletePayment: async (req, res) => {
  //     try {
  //       const { id } = req.params;

  //       await Payment.findOneAndRemove({ _id: id });

  //       req.flash("alertMessage", `successfully deleted Payment`);
  //       req.flash("alertStatus", `success`);
  //       res.redirect("/Payment");
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", `danger`);
  //       res.redirect("/Payment");
  //     }
  //   },
};
