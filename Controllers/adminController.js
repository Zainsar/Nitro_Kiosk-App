const AdminModel = require("../model/superadminmodel.js");
const FranchiseModel = require("../model/franchisemodel.js");
const { Admin } = require("../Middleware/generateToken.js");
const bcrypt = require("bcryptjs");
const Kiosk = require("../model/kiosk.js");

const add_Admin = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const admin = new AdminModel({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            Age: req.body.age,
            address: req.body.address,
            phone: req.body.phone
        });

        const newAdmin = await admin.save();


        res.status(200).json({
            success: true,
            message: "Admin Signup Successfully",
            newAdmin
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            name: 'Admin Username & Email unique',
            error: error.message
        });
    }
};

const updateAdminProfile = async (req, res) => {
    try {

        const { aid, username, address, phone } = req.body;

        const admin = await AdminModel.update({
            username: username,
            address: address,
            phone: phone
        }, {
            where: { admin_id: aid }
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin Updated Successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Admin API",
            error: error.message,
        });
    }
};

const updatePassword = async (req, res) => {
    try {

        const { aid, oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide old and new password.",
            });
        }

        const admin = await AdminModel.findOne({ where: { admin_id: aid } });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin Not Found",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid old password",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await AdminModel.update({ password: hashedPassword }, { where: { admin_id: aid } });

        res.status(200).json({
            success: true,
            message: "Password Updated!",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Password Update API",
            error: error.message,
        });
    }
};


const resetPassword = async (req, res) => {
    try {

        const { aid, newPassword } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const admin = await AdminModel.update({
            password: hashedPassword
        }, {
            where: { admin_id: aid }
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Password Reset API",
            error: error.message,
        });
    }
};

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide email and password.",
            });
        }

        const admin = await AdminModel.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin Not Found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const token = Admin;

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            admin: {
                admin_id: admin.admin_id,
                email: admin.email,
                username: admin.username,
                Age: admin.Age,
                address: admin.address,
                phone: admin.phone
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Login Admin API",
            error: error.message,
        });
    }
};

const deleteAdmin = async (req, res) => {
    try {

        const adminId = req.body.aid;

        const admin = await AdminModel.findOne(adminId);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        await admin.destroy();

        res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Admin API",
            error: error.message,
        });
    }
};

const add_Franchise = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const Franchise = new FranchiseModel({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            address: req.body.address,
            phone: req.body.phone
        });

        const newFranchise = await Franchise.save();


        res.status(200).json({
            success: true,
            message: "Franchise Signup Successfully",
            newFranchise
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            name: 'Franchise Username & Email unique',
            error: error.message
        });
    }
};

const AllFranchise = async (req, res) => {
    try {

        const Franchise = await FranchiseModel.findAll();

        if (!Franchise || Franchise.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        Franchise.password = undefined;

        res.status(200).json({
            success: true,
            message: "All Franchise get Successfully",
            Franchise,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get All Franchise API",
            error: error.message,
        });
    }
};

const OneFranchise = async (req, res) => {
    try {

        const Franchise = await FranchiseModel.findByPk(req.body.fid);

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        Franchise.password = undefined;

        res.status(200).json({
            success: true,
            message: "Franchise Data Found Successfully",
            Franchise,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get One Franchise API",
            error: error.message,
        });
    }
};

const deleteFranchise = async (req, res) => {
    try {

        const fid = req.body.fid;

        const Franchise = await FranchiseModel.findByPk(fid);

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise not found",
            });
        }

        await Franchise.destroy();

        res.status(200).json({
            success: true,
            message: "Franchise deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Franchise API",
            error: error.message,
        });
    }
};

const getFranchiseKiosk = async (req, res) => {
    try {

        const data = await FranchiseModel.findOne({
            where: { fid: req.body.franchiseId },
            include: [{ model: Kiosk }]
        });

        res.status(200).json({
            success: true,
            message: "Franchise Cources get successfully",
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Franchise API",
            error: error.message,
        });
    }
}
module.exports = {
    add_Admin,
    updateAdminProfile,
    updatePassword,
    resetPassword,
    loginAdmin,
    deleteAdmin,
    add_Franchise,
    AllFranchise,
    OneFranchise,
    deleteFranchise,
    getFranchiseKiosk
};