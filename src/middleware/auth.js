const config = require("../../config");
const jwt = require("jsonwebtoken");
const Player = require("../../app/player/model");

module.exports = {
  isLogin: async (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash(
        "alertMessage",
        `Sorry, your session has been expired. Please login again!`
      );
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    } else {
      next();
    }
  },
  playerAuthorization: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;
      const data = jwt.verify(token, config.jwtKey);

      const player = await Player.findOne({ _id: data.player.id });

      if (!player) {
        throw new Error();
      }
      // send data & token to request
      req.player = player;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).json({ error: "Not authorized to access this resource" });
    }
  },
};
