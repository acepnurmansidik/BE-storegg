const Nominal = require("../models/nominal");

module.exports = {
  indexNominal: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const nominal = await Nominal.find();

      res.render("admin/nominal/view_nominal", {
        title: "Nominal page",
        name: req.session.user.name,
        alert,
        nominal,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  viewCreateNominal: async (req, res) => {
    try {
      res.render("admin/nominal/create", {
        title: "Nominal | Create",
        name: req.session.user.name,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionCreateNominal: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      let nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();

      req.flash("alertMessage", `successfully created nominal`);
      req.flash("alertStatus", `success`);
      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  viewEditNominal: async (req, res) => {
    try {
      const { id } = req.params;

      let nominal = await Nominal.findOne({ _id: id });

      res.render("admin/nominal/edit", {
        title: "Nominal | Edit",
        name: req.session.user.name,
        nominal,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },
  actionEditNominal: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;

      await Nominal.findOneAndUpdate(
        { _id: id },
        { coinName, coinQuantity, price }
      );

      req.flash("alertMessage", `nominal edit successfully`);
      req.flash("alertStatus", `success`);
      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },
  actionDeleteNominal: async (req, res) => {
    try {
      const { id } = req.params;

      await Nominal.findOneAndRemove({ _id: id });

      req.flash("alertMessage", `successfully deleted nominal`);
      req.flash("alertStatus", `success`);
      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
};
