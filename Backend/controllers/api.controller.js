const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/get', asyncHandler(get));
    router.get('/getByID', asyncHandler(getByID));
    router.post('/create', asyncHandler(create));
    router.put('/update', asyncHandler(update));
}

//GET
async function get(req, res, next) {
    let tasks = await ToDo.findAll();

    res.status(200).json({ "message": tasks });
    console.log(tasks);
}

//GET BY ID
async function getByID(req, res, next) {
    let task = await ToDo.findOne({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ 'message': task });
    console.log(task);
}

//CREATE
async function create(req, res, next) {
    let todo = {
        title: req.body['title'],
        description: req.body['description']
    };

    if (!todo.title || !todo.description) {
        res.status(400).json({ "message": "Title or description is not filled!" });
    } else {
        let task = await ToDo.create(todo);

        res.status(201).json({ "message": "Row created" });
        console.log(task.title);
    }
}

//UPDATE
async function update(req, res, next) {
    if (!req.body['id']) {
        res.status(404).json({ "message": "id not found!" })
    } else {
        if (!req.body['title'] && !req.body['description']) {
            res.status(400).json({ "message": "nothing to change!" })
        } else {
            let id = req.body['id'];
            let task = await ToDo.update(req.body, {
                where: { id: id }
            });

            res.status(200).json({ "message": "Task updated" })
            console.log("Task with id", id, "updated");
        }
    }
}

//DELETE
// async function deleteByID(req, res, next) {

// }

initRoutes();

module.exports = router;