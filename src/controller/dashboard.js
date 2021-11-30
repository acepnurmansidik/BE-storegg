module.exports = {
  index_dashboard: async (req, res) => {
    try {
      res.render("index",{
        title: "Dashboard page"
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
