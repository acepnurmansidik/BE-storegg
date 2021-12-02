const Player = require("../models/player");

module.exports = {
  indexPlayer: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const players = await Player.find();

      res.render("admin/player/view_player", {
        title: "Player page",
        name: req.session.user.name,
        alert,
        players,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    }
  },
  viewDetailPlayer: async (req, res) => {
    try {
      const { id } = req.params;

      const player = await Player.findOne({ _id: id });
      console.log(player);

      res.render("admin/player/detail", {
        title: "Detail player page",
        name: req.session.user.name,
        player,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    }
  },
};
