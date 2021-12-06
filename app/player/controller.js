const path = require("path");
const fs = require("fs");
const config = require("../../config");
const Voucher = require("../voucher/model");
const Nominal = require("../nominal/model");
const Category = require("../category/model");
const Payment = require("../payments/model");
const Bank = require("../bank/model");
const Transaction = require("../transaction/model");
const Player = require("./model");
const { nextTick } = require("process");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find()
        .select("_id name status category thumbnail")
        .populate("category");

      res.status(200).json({ data: voucher });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });
      res.status(200).json({ data: voucher });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  categoryPage: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  checkoutPage: async (req, res) => {
    try {
      // accountUser = akun id game
      // name = nama pemilik bank
      const { accountUser, name, nominal, voucher, payment, bank } = req.body;

      // voucher
      const res_voucher = await Voucher.findOne({ _id: voucher })
        .select("name category _id thumbnail user")
        .populate("category")
        .populate("user");
      if (!res_voucher)
        return res.status(404).json({ message: "Voucher game not found!" });

      // nominal
      const res_nominal = await Nominal.findOne({ _id: nominal });
      if (!res_nominal)
        return res.status(404).json({ message: "Nominal not found!" });

      // payment
      const res_payment = await Payment.findOne({ _id: payment });
      if (!res_payment)
        return res.status(404).json({ message: "Payment not found!" });

      // bank
      const res_bank = await Bank.findOne({ _id: bank });
      if (!res_bank)
        return res.status(404).json({ message: "Bank not found!" });

      let tax = (10 / 100) * res_nominal._doc.price;
      let value = res_nominal._doc.price + tax;

      const payload = {
        historyVoucherTopup: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category
            ? res_voucher._doc.category.name
            : "",
          thumbnail: res_voucher._doc.thumbnail,
          coinName: res_nominal._doc.coinName,
          coinQuantity: res_nominal._doc.coinQuantity,
          price: res_nominal._doc.price,
        },
        historyPayment: {
          name: res_bank._doc.name,
          type: res_payment._doc.type,
          bankName: res_bank._doc.bankName,
          noRekening: res_bank._doc.noRekening,
        },
        historyUser: {
          name: res_voucher._doc.user?.name,
          phoneNumber: res_voucher._doc.user?.phoneNumber,
        },
        tax: tax,
        name: name,
        accountUser: accountUser,
        value: value,
        player: req.player._id,
        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id,
      };

      let transaction = new Transaction(payload);
      await transaction.save();

      res.status(201).json({ data: transaction });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  historyPage: async (req, res) => {
    try {
      const { status = "" } = req.query;
      let criteria = {};

      // for filtering
      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: "i" },
        };
      }

      // for searching player spesific
      if (req.player._id) {
        criteria = {
          ...criteria,
          player: req.player._id,
        };
      }

      const history = await Transaction.find(criteria);

      let total = await Transaction.aggregate([
        { $match: criteria },
        {
          $group: {
            _id: null,
            value: { $sum: "$value" },
          },
        },
      ]);

      res.status(200).json({
        data: history,
        total: total.length ? total[0].value : 0,
      });

      // console.log(req.player.player.id);
    } catch (err) {
      res.status(500).json({ message: err.message || `Internel server error` });
    }
  },
  historyDetailPage: async (req, res) => {
    try {
      const { id } = req.params;

      const history = await Transaction.findOne({ _id: id });

      if (!history)
        return res.status(404).json({ message: "History not found!" });

      res.status(200).json({ data: history });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  dashboard: async (req, res) => {
    try {
      const counts = await Transaction.aggregate([
        { $match: { player: req.player._id } },
        {
          $group: {
            _id: "$category",
            value: { $sum: "$value" },
          },
        },
      ]);

      const categories = await Category.find();
      categories.map((category) => {
        counts.map((count) => {
          if (category._id.toString() === count._id.toString()) {
            count.name = category.name;
          }
        });
      });

      const history = await Transaction.find({ player: req.player._id })
        .populate("category")
        .sort({ createdAt: -1 });

      res.status(200).json({ data: history, counts });
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },
  profilePage: async (req, res) => {
    try {
      const player = {
        id: req.player._id,
        email: req.player.email,
        phoneNumber: req.player.phoneNumber,
        password: req.player.password,
        avatar: req.player.avatar,
      };
      res.status(200).json({ data: player });
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },
  updateProfilePage: async (req, res, next) => {
    try {
      const { name = "", phoneNumber = "" } = req.body;

      const payload = {};

      if (name.length) payload.name = name;
      if (phoneNumber.length) payload.phoneNumber = phoneNumber;

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
          `public/uploads/profile/${filename}`
        );

        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        //  save file
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          let player = await Player.findOne({ _id: req.player._id });

          let currentImage = `${config.rootPath}/public/uploads/profile/${player.avatar}`;
          // check if there is a picture
          if (fs.existsSync(currentImage)) {
            // delete image
            fs.unlinkSync(currentImage);
          }

          player = await Player.findOneAndUpdate(
            { _id: req.player._id },
            { ...payload, avatar: filename },
            { new: true, runValidators: true }
          );

        res.status(201).json({
          data: {
            id: player.id,
            name: player.name,
            phoneNumber: player.phoneNumber,
            avatar: player.avatar,
          },
        });
        });
      } else {
        const player = await Player.findOneAndUpdate(
          { _id: req.player._id },
          payload,
          { new: true, runValidators: true }
        );

        res.status(201).json({
          data: {
            id: player.id,
            name: player.name,
            phoneNumber: player.phoneNumber,
            avatar: player.avatar,
          },
        });
      }
    } catch (err) {
      if(err&err.name === "ValidationError"){
        res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors
        })
      }
      next(err)
    }
  },
};
