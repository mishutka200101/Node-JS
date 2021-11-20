const ErrorResponse = require('../classes/error-response');
const Token = require('../dataBase/models/Token.model');

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
}

const errorHandler = (err, _req, res, next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

const requireToken = async (req, res, next) => {
    let token = req.headers['token'];
    if (!token) {
        throw new ErrorResponse("No token!", 400);
    } 
    
    let result = await Token.findOne({
        where: {
            value: token
        }
    });
    if (!result) {
        throw new ErrorResponse('Wrong token!', 401);
    };

    req.userId = result.userId;

    next();
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken
};