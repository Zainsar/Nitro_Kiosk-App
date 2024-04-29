const FranchiseModel = require("../model/franchisemodel.js");
const { Franchise } = require("../Middleware/generateToken.js");
const bcrypt = require("bcryptjs");
const Kiosk = require("../model/kiosk.js");

const updateFranchiseProfile = async (req, res) => {
    try {

        const { userid, username, address, phone } = req.body;

        const Franchise = await FranchiseModel.update({
            username: username,
            address: address,
            phone: phone
        }, {
            where: { fran_id: userid }
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

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updatePassword = await FranchiseModel.update({
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

        const token = Franchise;

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

module.exports = {
    updateFranchiseProfile,
    updateFranchisePassword,
    resetFranchisePassword,
    loginFranchise
};