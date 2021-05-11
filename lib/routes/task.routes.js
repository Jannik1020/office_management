module.exports = (app) => {
    const task = require("../controller/task.controller")
    const router = require("express").Router()

    router.post("/find/id/", task.findByID)
    router.post("/find/section/", task.findBySection)
    router.post("/find/", task.findAll)

    router.post("/create/", task.create)
    router.post("/remove/", task.remove)
    router.post("/update/", task.update)

    app.use("/api/tasks", router)
}