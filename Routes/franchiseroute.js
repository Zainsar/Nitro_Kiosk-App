const express = require("express");
const { updateFranchiseProfile, updateFranchisePassword, resetFranchisePassword, loginFranchise,
    add_Product, updateProduct, AllProduct, deleteProduct, AssignProduct, addlocation, KioskLocation,
    KioskProduct, updateKiosk, updatekioskPassword } = require("../Controllers/franchiseController.js");
const { verifytokenFranchise } = require("../Middleware/verifyToken.js");

const router = express.Router();

router.post("/loginfranchise", loginFranchise);

router.put("/updateprofile", verifytokenFranchise, updateFranchiseProfile);

router.post("/updatepassword", verifytokenFranchise, updateFranchisePassword);

router.post("/resetpassword", verifytokenFranchise, resetFranchisePassword);

router.put("/updatekiosk", verifytokenFranchise, updateKiosk);

router.post("/updatekioskpassword", verifytokenFranchise, updatekioskPassword);

router.post("/addproduct", verifytokenFranchise, add_Product);

router.put("/updateproduct", verifytokenFranchise, updateProduct);

router.get("/allproduct", verifytokenFranchise, AllProduct);

router.delete("/deleteproduct", verifytokenFranchise, deleteProduct);

router.post("/assignproduct", verifytokenFranchise, AssignProduct);

router.post("/kioskproduct", verifytokenFranchise, KioskProduct);

router.post("/addlocation", verifytokenFranchise, addlocation);

router.post("/kiosklocation", verifytokenFranchise, KioskLocation);

module.exports = router;