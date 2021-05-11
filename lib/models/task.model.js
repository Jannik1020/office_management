module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: {
            type: Sequelize.STRING,
        },
        section: {
            type: Sequelize.STRING,
        },
        checked: {
            type: Sequelize.BOOLEAN,
        },
        important: {
            type: Sequelize.BOOLEAN,
        },
    })

    return Task
}