const KioskModel = require("../model/kiosk.js");
const { Kiosk } = require("../Middleware/generateToken.js");
const bcrypt = require("bcryptjs");

const loginkiosk = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide email and password.",
            });
        }

        const Kiosks = await KioskModel.findOne({ where: { email: email } });

        if (!Kiosks) {
            return res.status(404).json({
                success: false,
                message: "Kiosk Not Found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, Kiosks.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const token = Kiosk(Kiosk);

        res.status(200).json({
            success: true,
            message: "Kiosk Login Successful",
            token,
            Kiosk: {
                id: Kiosks.kid,
                franchiseId: Kiosks.franchiseId,
                email: Kiosks.email,
                password: Kiosks.password,
                noOftap: Kiosks.noOftap
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error in Login Kiosk Api',
            error: error.message
        });
    }
};

module.exports = loginkiosk