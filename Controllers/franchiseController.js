const FranchiseModel = require("../model/franchisemodel.js");
const ProductModel = require("../model/ProductModel.js");
const KioskModel = require("../model/kiosk.js");
const Kioskproduct1 = require("../model/kioskproduct.js");
const Kiosklocation1 = require("../model/kiosklocation.js");
const { Franchise } = require("../Middleware/generateToken.js");
const bcrypt = require("bcryptjs");

const loginFranchise = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide email and password.",
            });
        }

        const franchise = await FranchiseModel.findOne({ where: { email } });

        if (!franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, franchise.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const token = Franchise(Franchise);

        res.status(200).json({
            success: true,
            message: "Franchise Login Successful",
            token,
            franchise: {
                id: franchise.fid,
                email: franchise.email,
                username: franchise.username,
                address: franchise.address,
                phone: franchise.phone
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error in Login Franchise Api',
            error: error.message
        });
    }
};

const updateFranchiseProfile = async (req, res) => {
    try {

        const { userid, username, address, phone } = req.body;

        const Franchise = await FranchiseModel.update({
            username: username,
            address: address,
            phone: phone
        }, {
            where: { fid: userid }
        })

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Franchise Profile Updated Successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Profile Franchise API",
            error: error.message,
        });
    }
};

const updateFranchisePassword = async (req, res) => {
    try {

        const { userid, oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide old and new password.",
            });
        }

        const Franchise = await FranchiseModel.findOne({ where: { fid: userid } });

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, Franchise.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid old password",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await FranchiseModel.update({
            password: hashedPassword
        }, {
            where: { fid: userid }
        })

        res.status(200).json({
            success: true,
            message: "Franchise Password Updated!",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Franchise Password Update API",
            error: error.message,
        });
    }
};

const resetFranchisePassword = async (req, res) => {
    try {

        const { userId, newPassword } = req.body;

        const Franchise = await FranchiseModel.findOne({ where: { fid: userId } });

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await FranchiseModel.update({
            password: hashedPassword
        }, {
            where: { fid: userId }
        })

        res.status(200).json({
            success: true,
            message: "Franchise Password Reset Successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Franchise Password Reset API",
            error: error.message,
        });
    }
};

const add_Product = async (req, res) => {
    try {

        const Product = new ProductModel({
            name: req.body.name,
            logo: req.body.logo,
            retailprice: req.body.retailprice
        });

        const newProduct = await Product.save();


        res.status(200).json({
            success: true,
            message: "Product created Successfully",
            newProduct
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {

        const { pid, name, logo, retailprice } = req.body;

        const Product = await ProductModel.update({
            name: name,
            logo: logo,
            retailprice: retailprice
        }, {
            where: { pid: pid }
        })

        if (!Product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Product API",
            error: error.message,
        });
    }
};

const updateKiosk = async (req, res) => {
    try {

        const { kid, noOfTap } = req.body;

        const kiosk = await KioskModel.update({
            noOfTap: noOfTap
        }, {
            where: { kid: kid }
        })

        if (!kiosk) {
            return res.status(404).json({
                success: false,
                message: "Kiosk not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Kiosk Updated Successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Kiosk API",
            error: error.message,
        });
    }
};

const updatekioskPassword = async (req, res) => {
    try {

        const { kId, oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide old and new password.",
            });
        }

        const Kiosk = await KioskModel.findOne({ where: { kid: kId } });

        if (!Kiosk) {
            return res.status(404).json({
                success: false,
                message: "Kiosk Not Found",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, Kiosk.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid old password",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await KioskModel.update({
            password: hashedPassword
        }, {
            where: { kid: kId }
        })

        res.status(200).json({
            success: true,
            message: "Kiosk Password Updated!",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Kiosk Password Update API",
            error: error.message,
        });
    }
};

const AllProduct = async (req, res) => {
    try {

        const Product = await ProductModel.findAll();

        if (!Product || Product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "All Product get Successfully",
            Product,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get All Product API",
            error: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {

        const pid = req.body.pid;

        const Product = await ProductModel.findByPk(pid);

        if (!Product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await Product.destroy();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Product API",
            error: error.message,
        });
    }
};

const AssignProduct = async (req, res) => {
    try {

        const KisokProducts = new Kioskproduct1({
            kioskId: req.body.kid,
            productId: req.body.pid,
            noOfTap: req.body.noOfTap,
            MRP: req.body.mrp
        });

        const assignproducts = await KisokProducts.save();


        res.status(200).json({
            success: true,
            message: "Product Assign Successfully",
            assignproducts
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const KioskProduct = async (req, res) => {
    try {

        const data = await KioskModel.findOne({
            where: { kid: req.body.kioskId },
            include: [{
                model: Kioskproduct1,
                include: [{ model: ProductModel }]
            }]
        });

        res.status(200).json({
            success: true,
            message: "Kisok product get successfully",
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Kiosk Product API",
            error: error.message,
        });
    }
}

const addlocation = async (req, res) => {
    try {

        const addlocation = new Kiosklocation1({
            kid: req.body.kid,
            location: req.body.location
        });

        const newlocation = await addlocation.save();


        res.status(200).json({
            success: true,
            message: "Location Added Successfully",
            newlocation
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const KioskLocation = async (req, res) => {
    try {

        const data = await KioskModel.findOne({
            where: { kid: req.body.kid },
            include: [{ model: Kiosklocation1 }]
        });

        res.status(200).json({
            success: true,
            message: "Kisok Location get successfully",
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Kiosk Location API",
            error: error.message,
        });
    }
}

module.exports = {
    loginFranchise,
    updateFranchiseProfile,
    updateFranchisePassword,
    resetFranchisePassword,
    updateKiosk,
    updatekioskPassword,
    add_Product,
    updateProduct,
    AllProduct,
    deleteProduct,
    AssignProduct,
    KioskProduct,
    addlocation,
    KioskLocation
};