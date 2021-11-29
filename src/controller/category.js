module.exports = {
  index_category: async (req, res) => {
    try {
      res.render("admin/category/view_category");
    } catch (err) {
      console.log(err.message);
    }
  },
};
