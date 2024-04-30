const express = require("express");
const { add_Admin, loginAdmin, updateAdminProfile, updatePassword, resetPassword, add_Franchise,
    AllFranchise, deleteFranchise, FranchiseKiosk, add_Kiosk, AllKiosk, deleteKiosk,
    test
} = require("../Controllers/adminController.js");
const { verifytokenAdmin } = require("../Middleware/verifyToken.js");

const router = express.Router();

router.post("/signupadmin", add_Admin);

router.post("/loginadmin", loginAdmin);

router.put("/updateprofile", verifytokenAdmin, updateAdminProfile);

router.post("/updatepassword", verifytokenAdmin, updatePassword);

router.post("/resetpassword", verifytokenAdmin, resetPassword);

router.post("/createfranchise", verifytokenAdmin, add_Franchise);

router.get("/allfranchise", verifytokenAdmin, AllFranchise);

router.delete("/deletefranchise", verifytokenAdmin, deleteFranchise);

router.post("/franchisekiosk", verifytokenAdmin, FranchiseKiosk);

router.post("/createkiosk", verifytokenAdmin, add_Kiosk);

router.get("/allkiosk", verifytokenAdmin, AllKiosk);

router.delete("/deletekiosk", verifytokenAdmin, deleteKiosk);

module.exports = router;