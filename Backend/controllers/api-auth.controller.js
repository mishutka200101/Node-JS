const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const { nanoid } = require('nanoid');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model');
const { asyncHandler } = require('../middlewares/middlewares');
const { Op } = require('sequelize');

const router = Router();

function initRoutes() {
    router.post('/registration', asyncHandler(registration));
    router.post('/login', asyncHandler(login));
}

async function registration(req, res, next) {
    let used = await User.findOne({
        attributes: ['login', 'email'],
        where: {
            [Op.or]: [{ login: req.body.login }, { email: req.body.email }],
        },
    });
    if (used) {
        throw new ErrorResponse("login or email already used", 400);
    }
    let user = await User.create(req.body);

    res.status(200).json(user);
}

async function login(req, res, next) {
    let user = await User.findOne({
        attributes: ['id', 'password', 'login'],
        where: {
            login: req.body.login,
            password: req.body.password,
        },
    });
    if (!user) {
        throw new ErrorResponse('Wrong login or password', 400);
    }

    const token = await Token.create({
        userId: user.id,
        value: nanoid(128),
    });
    
    res.status(200).json({ accessToken: token.value });
}

initRoutes();

module.exports = router;