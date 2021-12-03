const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

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
};
