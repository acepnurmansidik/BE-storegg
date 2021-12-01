const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/users/view_signin", {
          title: "Signin page",
          alert,
        });
      } else {
        res.redirect("/dashboard");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });

      if (userExist) {
        console.log("OKE");
        if (userExist.status === "Y") {
          const isMatchPass = await bcrypt.compare(
            password,
            userExist.password
          );
          if (isMatchPass) {
            req.session.user = {
              id: userExist._id,
              email: userExist.email,
              name: userExist.name,
              status: userExist.status,
            };
            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", `Wrong password`);
            req.flash("alertStatus", `danger`);
            res.redirect("/");
          }
        } else {
          req.flash("alertMessage", `Sorry, status not active`);
          req.flash("alertStatus", `danger`);
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `Your email not register`);
        req.flash("alertStatus", `danger`);
        res.redirect("/");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    }
  },
};
