const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services/index');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created a new user",
            data: response,
            err: {},
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error,
        })
    }
}

module.exports = {
    create,
}