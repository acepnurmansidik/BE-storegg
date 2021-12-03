const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body;

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

        const player = new Player({ ...payload, avatar: filename });
        await player.save();
        delete player._doc.password;

        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        //  save file
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);

        res.status(201).json({ message: player });
      } else {
        let player = new Player(payload);
        await player.save();
        delete player._doc.password;
        res.status(201).json({ message: player });
      }
    } catch (err) {
      if (err & (err.name === "ValidationError")) {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const player = await Player.findOne({ email });
      if (player) {
        const isMatch = await bcrypt.compare(password, player.password);
        if (isMatch) {
          const token = jwt.sign(
            {
              player: {
                id: player.id,
                username: player.username,
                email: player.email,
                nama: player.nama,
                phoneNumber: player.phoneNumber,
                avatar: player.avatar,
              },
            },
            config.jwtKey
          );
          res.status(200).json({ token });
        } else {
          res
            .status(403)
            .json({ message: "The password you entered is wrong!" });
        }
      } else {
        res.status(403).json({ message: "Your email is not registered!" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
