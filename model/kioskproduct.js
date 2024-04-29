const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");

const KioskProduct = db.define("Kiosk_Product", {
    kpId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    kioskId: {
        type: Sequelize.UUID,
    },
    productId: {
        type: Sequelize.UUID,
    },
    noOfTap: {
        type: Sequelize.STRING,
    },
    MRP: {
        type: Sequelize.DECIMAL,
    }

})

module.exports = KioskProduct;