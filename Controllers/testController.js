const AdminModel = require("../model/superadminmodel.js");
const { Op } = require("sequelize")

// Equality Operator
const test = async (req, res) => {
    try {

        const test = await AdminModel.findAll({
            where: {
                Admin_id: { [Op.eq]: '71c70655-81ed-4b70-b18b-9028721479e7' },
            },
        });

        res.status(501).json({
            success: true,
            message: 'Test Succesful',
            test: test
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'error in test api',
            error: error.message
        })
    }
}

//Implicit Operators

const test2 = async (req, res) => {
    try {

        const test = await AdminModel.findAll({
            where: {
                // Admin_id: null,
                // Admin_id: ['71c70655-81ed-4b70-b18b-9028721479e7', 3],
                Admin_id: '71c70655-81ed-4b70-b18b-9028721479e7'
            },
        });

        res.status(501).json({
            success: true,
            message: 'Test Succesful',
            test: test
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'error in test api',
            error: error.message
        })
    }
}

module.exports = {
    test,
    test2
}