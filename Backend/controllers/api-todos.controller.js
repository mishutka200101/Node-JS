const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/', asyncHandler(requireToken), asyncHandler(get));
    router.get('/:id', asyncHandler(requireToken), asyncHandler(getByID));
    router.post('/', asyncHandler(requireToken), asyncHandler(create));
    router.patch('/:id', asyncHandler(requireToken), asyncHandler(update));
    router.delete('/:id', asyncHandler(requireToken), asyncHandler(deleteByID));
    router.delete('/', asyncHandler(requireToken), asyncHandler(deleteAll));
}

//GET
async function get(req, res, next) {
    let tasks = await ToDo.findAll({
        where: {
            userId: req.userId
        }
    });

    res.status(200).json({ tasks });
    console.log(tasks);
}

//GET BY ID
async function getByID(req, res, next) {
    let task = await ToDo.findOne({
        where: {
            userId: req.userId,
            id: req.params.id
        }
    })

    res.status(200).json({ task });
    console.log(task);
}

//CREATE
async function create(req, res, next) {
    let todo = {
        userId: req.userId,
        title: req.body['title'],
        description: req.body['description']
    };

    if (!todo.title || !todo.description) {
        new ErrorResponse("No data filled!", 400);
    }
    let task = await ToDo.create(todo);

    res.status(201).json(task);
    console.log(task.title);
}

//UPDATE
async function update(req, res, next) {
    if (!req.body['id']) {
        new ErrorResponse("Id not found!", 404);
    }
    if (!req.body['title'] && !req.body['description']) {
        new ErrorResponse("Nothing to change", 400);
    }

    let id = req.body['id'];
    let task = await ToDo.update(req.body, {
        where: {
            userId: req.userId,
            id: req.params.id
        }
    });

    res.status(200).json({ "message": "Task updated" })
    console.log("Task with id", id, "is updated");
}

//DELETE
async function deleteByID(req, res, next) {
    await ToDo.destroy({
        where: {
            userId: req.userId,
            id: req.params.id
        }
    });

    res.status(200).json({ "message": "Task deleted" });
}

//DELETE ALL
async function deleteAll(req, res, next) {
    await ToDo.destroy({
        where: {
            userId: req.userId
        }
    });

    res.status(200).json({ "message": "ToDos deleted" });
}

initRoutes();

module.exports = router;