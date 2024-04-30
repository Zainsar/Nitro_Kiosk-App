const jwt = require('jsonwebtoken');

const admintoken = (admin) => {
    const payload = {
        admin_id: admin.admin_id,
        email: admin.email,
        username: admin.username,
        roll: 0
    };
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn: '24h'
    };
    let token = jwt.sign(payload, secretKey, options);
    return token

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

const Kiosk = (Kiosk) => {
    const payload = {
        kid: Kiosk.kid,
        email: Kiosk.email,
        roll: 3
    };
    const secretKey = process.env.JWT_SECRET3;
    const options = {
        expiresIn: '24h'
    };
    return jwt.sign(payload, secretKey, options);
};

module.exports = {
    admintoken,
    Franchise,
    Kiosk
}