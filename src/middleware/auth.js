module.exports = {
  isLogin: async (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash("alertMessage", `Sorry, your session has been expired. Please login again!`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    } else {
      next();
    }
  },
};
