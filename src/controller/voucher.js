const Voucher = require("../models/voucher");
const Nominal = require("../models/nominal");
const Category = require("../models/category");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  indexVoucher: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      // read data voucher wuth category & nominals
      const voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");

      res.render("admin/voucher/view_voucher", {
        title: "Voucher page",
        alert,
        voucher,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  viewCreateVoucher: async (req, res) => {
    try {
      const nominals = await Nominal.find();
      const categories = await Category.find();

      res.render("admin/voucher/create", {
        title: "Voucher page",
        nominals,
        categories,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  actionCreateVoucher: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      // file exist
      if (req.file) {
        // file to be uploaded
        let tmp_path = req.file.path;
        // take file extension
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        // concatenate filename with originalExt
        let filename = req.file.filename + "." + originalExt;
        //  save to destination file
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        //  save file
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = await new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();

            req.flash("alertMessage", `successfully created voucher`);
            req.flash("alertStatus", `success`);
            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = await new Voucher({ name, category, nominals });

        await voucher.save();

        req.flash("alertMessage", `successfully created voucher`);
        req.flash("alertStatus", `success`);
        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  viewEditVoucher: async (req, res) => {
    try {
      const { id } = req.params;

      const nominals = await Nominal.find();
      const categories = await Category.find();
      let voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals");

      res.render("admin/voucher/edit", {
        title: "Nominal | Edit",
        voucher,
        nominals,
        categories,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  actionEditVoucher: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

      // file exist
      if (req.file) {
        // file to be uploaded
        let tmp_path = req.file.path;
        // take file extension
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        // concatenate filename with originalExt
        let filename = req.file.filename + "." + originalExt;
        //  save to destination file
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        //  save file
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id });
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

            // check if there is a picture
            if (fs.existsSync(currentImage)) {
              // delete image
              fs.unlinkSync(currentImage);
            }

            await Voucher.findOneAndUpdate(
              { _id: id },
              { name, category, nominals, thumbnail: filename }
            );

            req.flash("alertMessage", `successfully edit voucher`);
            req.flash("alertStatus", `success`);
            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/voucher");
          }
        });
      } else {
        await Voucher.findOneAndUpdate(
          { _id: id },
          { name, category, nominals }
        );

        req.flash("alertMessage", `successfully edit voucher`);
        req.flash("alertStatus", `success`);
        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  // actionDeleteVoucher: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const voucher = await Voucher.findOne({ _id: id });
  //     let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

  //     // check if there is a picture
  //     if (fs.existsSync(currentImage)) {
  //       // delete image
  //       fs.unlinkSync(currentImage);
  //     }

  //     // await Voucher.findOneAndRemove({ _id: id });
  //     await voucher.deleteOne();

  //     req.flash("alertMessage", `successfully deleted nominal`);
  //     req.flash("alertStatus", `success`);
  //     res.redirect("/nominal");
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", `danger`);
  //     res.redirect("/nominal");
  //   }
  // },
};
