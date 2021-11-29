const Category = require("../models/category");

module.exports = {
  index_category: async (req, res) => {
    try {
      const category = await Category.find()
      res.render("admin/category/view_category",{
        title: "Category page",
        category,
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  view_create: async(req, res)=>{
    try {
      res.render("admin/category/create", {
        title: "Category | Create",
      });
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
