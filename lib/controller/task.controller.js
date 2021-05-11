const db = require("../models")
const Task = db.tasks
const User = db.users

exports.findByID = (req, res) => {
    const id = req.body.id;
    const userId = req.body.userId

    Task.findOne({where: {id: id, userId: userId}}).then(data => {
        const task = data;
        res.send({
            task: {
                id: task.id,
                title: task.title,
                section: task.section,
                checked: task.checked,
                important: task.important
            }
        })
    })
        .catch(err => {
            console.log("Cannot find task with id = " + id);
            console.log(err)
        })
    ;
}

exports.findBySection = (req, res) => {
    const section = req.body.section;
    const userId = req.body.userId;

    Task.findAll({where: {section: section, userId: userId}}).then(data => {
        res.send(data)
    }).catch(err => {
        console.log("Cannot find tasks with section " + section)
        console.log(err)
    })
}

exports.findAll = (req, res) => {
    const userId = req.body.userId
    Task.findAll({where: {userId: userId}}).then(data => res.send(data)).catch(err => "cannot find tasks of user " + userId)
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Request body cannot be empty"
        })
    }

    const task = req.body.task; // tasks: {title, section, ..., userId!!}
    console.log(task)
    Task.create(task).then(data => {
        res.send({task: data})
    }).catch(err => {
        res.send({
            message: "cannot create tasks in bulk"
        })
    })
}

exports.remove = (req, res) => { // "id": [id1, id2, ...]
    if (!req.body) {
        res.status(400).send({
            message: "Request body cannot be empty"
        })
    }

    const id = req.body.id;
    const userId = req.body.userId;

    console.log(id, " ", userId)

    Task.findOne({where: {id: id, userId: userId}}).then(task => Task.destroy({
        where: {
            id: id,
            userId: userId
        }
    }).then(num => {
        res.send({task: task, message: "Tasks were deleted successfully"})
    }).catch(err => {
            console.log("Failed deleting tasks")
            console.log(err)
        }
    ))

}

exports.update = (req, res) => { // {"1": {section:"important, important: true}, "2"
    if (!req.body) {
        res.status(400).send({
            message: "Request body cannot be empty"
        })
    }

    const taskId = req.body.taskId;
    const toUpdate = req.body.toUpdate;
    console.log(toUpdate)
    const userId = req.body.userId;

    Task.update(toUpdate, {
        where: {id: taskId, userId: userId}
    }).then(data => {
        Task.findOne({where: {id: taskId, userId: userId}}).then(task => res.send({task: task, message: "Updated task " + taskId + "successful"}))
    }).catch(err => {
        res.send({message: "error updating task" + taskId})
    })
}
