const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");
const Product = require("./ProductModel.js");

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

KioskProduct.belongsTo(Product, { foreignKey: "productId" })

module.exports = KioskProduct;