const Voucher = require("./model");
const Nominal = require("../nominal/model");
const Category = require("../category/model");
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
        name: req.session.user.name,
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
        name: req.session.user.name,
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
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
              user: req.session.user.id,
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
        const voucher = await new Voucher({
          name,
          category,
          nominals,
          user: req.session.user.id,
        });

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
        name: req.session.user.name,
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
  actionDeleteVoucher: async (req, res) => {
    try {
      const { id } = req.params;

      const voucher = await Voucher.findOne({ _id: id });
      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

      // check if there is a picture
      if (fs.existsSync(currentImage)) {
        // delete image
        fs.unlinkSync(currentImage);
      }

      await voucher.deleteOne();

      req.flash("alertMessage", `successfully deleted voucher`);
      req.flash("alertStatus", `success`);
      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });
      const status = voucher.status === "Y" ? "N" : "Y";

      await Voucher.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", `successfully update status`);
      req.flash("alertStatus", `success`);
      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
};
