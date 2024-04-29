const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");

const Location = db.define("Kiosk_Location", {
    l_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    kioskId: {
        type: Sequelize.UUID,
    },
    location: {
        type: Sequelize.STRING,
    }

})

module.exports = Location;