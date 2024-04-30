const Sequelize = require("sequelize")

const db = new Sequelize(
    "nitro_kiosk_app",
    "root",
    "",
    {
        host: "127.0.0.1",
        dialect: "mysql",
        port: '3306',
        dialectOptions: {
            connectTimeout: 100000
        },
        pool: {
            max: 10,
            min: 0,
        }
    }
);

module.exports = db