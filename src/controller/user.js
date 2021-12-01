const Users = require("../models/user");

module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/users/view_signin", {
        title: "Signin page",
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    }
  },
};
