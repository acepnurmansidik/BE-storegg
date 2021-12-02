// const Voucher = require("../../app/voucher/model");

// module.exports = {
//   landingPage: async (req, res) => {
//     try {
//       // cari kategori di voucher
//       // select berfungsi untuk memilih data yang kita perlukan dari collection
//       const voucher = await Voucher.find()
//         .select("_id name status category thumbnail")
//         .populate("category");

//       res.status(200).json({ data: voucher });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: error.message || `Internal server error` });
//     }
//   },
//   detailPage: async (req, res) => {
//     try {
//       const {id}=req.params
//       const voucher = await Voucher.findOne({_id:id})
//         .select("_id name category thumbnail user nominals")
//         .populate("nominals")
//         .populate("category")
//         .populate("user", "_id name phoneNumber");

//       if(!voucher){
//         return res.status(404).json({ message: "Voucher game not found!." });
//       }

//       res.status(200).json({ data: voucher });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: error.message || `Internal server error` });
//     }
//   },
// };
