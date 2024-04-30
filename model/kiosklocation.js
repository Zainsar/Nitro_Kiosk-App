const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");

const Location = db.define("Kiosk_Location", {
    lid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    kid: {
        type: Sequelize.UUID,
    },
    location: {
        type: Sequelize.STRING,
    }

})

module.exports = Location;