const Category = require("../models/category");

module.exports = {
  index_category: async (req, res) => {
    try {
      res.render("admin/category/view_category");
    } catch (err) {
      console.log(err.message);
    }
  },

  view_create: async(req, res)=>{
    try {
      res.render("admin/category/create");
    } catch (err) {
      console.log(err.message);
    }
  },
  actionCreate: async(req, res)=>{
    try {
      const { name } = req.body;
      let category = await Category({name})
      await category.save();
      res.redirect("/category")
    } catch (err) {
      console.log(err)
    }
  }
};
