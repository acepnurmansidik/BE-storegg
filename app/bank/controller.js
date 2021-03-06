const Bank = require("./model");

module.exports = {
  indexBank: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const banks = await Bank.find();

      res.render("admin/bank/view_bank", {
        title: "Bank page",
        name: req.session.user.name,
        alert,
        banks,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  viewCreateBank: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        title: "Bank | Create",
        name: req.session.user.name,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  actionCreateBank: async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;
      let bank = await Bank({ name, bankName, noRekening });
      await bank.save();

      req.flash("alertMessage", `successfully created Bank`);
      req.flash("alertStatus", `success`);
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  viewEditBank: async (req, res) => {
    try {
      const { id } = req.params;

      let bank = await Bank.findOne({ _id: id });

      res.render("admin/bank/edit", {
        title: "Bank | Edit",
        name: req.session.user.name,
        bank,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  actionEditBank: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, noRekening } = req.body;

      await Bank.findOneAndUpdate({ _id: id }, { name, bankName, noRekening });

      req.flash("alertMessage", `Bank edit successfully`);
      req.flash("alertStatus", `success`);
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  actionDeleteBank: async (req, res) => {
    try {
      const { id } = req.params;

      await Bank.findOneAndRemove({ _id: id });

      req.flash("alertMessage", `successfully deleted Bank`);
      req.flash("alertStatus", `success`);
      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
};
