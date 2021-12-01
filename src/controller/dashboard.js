module.exports = {
  index_dashboard: async (req, res) => {
    try {
      res.render("index",{
        title: "Dashboard page",
        name: req.session.user.name
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
