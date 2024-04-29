const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")

dotenv.config()

const verifytokenAdmin = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token is not valid!'
                });
            }
            req.admin = admin;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'You are not authenticated'
        });
    }
};

const verifytokenFranchise = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET2, (err, Franchise) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token is not valid!'
                });
            }
            req.Franchise = Franchise;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'You are not authenticated'
        });
    }
};

module.exports = {
    verifytokenAdmin,
    verifytokenFranchise
}