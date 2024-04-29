const jwt = require('jsonwebtoken');

const Admin = (admin) => {
    const payload = {
        aid: admin.admin_id,
        email: admin.email,
        username: admin.username,
        roll: 0
    };
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn: '24h'
    };
    return jwt.sign(payload, secretKey, options);
};

const Franchise = (Franchise) => {
    const payload = {
        fid: Franchise.fid,
        email: Franchise.email,
        username: Franchise.username,
        roll: 1
    };
    const secretKey = process.env.JWT_SECRET2;
    const options = {
        expiresIn: '24h'
    };
    return jwt.sign(payload, secretKey, options);
};

module.exports = {
    Admin,
    Franchise
}