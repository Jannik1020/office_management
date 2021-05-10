export const defaultSections = {
    TASKS_COMPLETED: {
        name: "completedTasks",
        header: "Erledigte Aufgaben",
        props:{checked: true, important: false}
    },
    TASKS: {
        name: "tasks",
        header: "Ausstehende Aufgaben",
        props:{checked: false, important: false}
    },
    TASKS_IMPORTANT: {
        name: "importantTasks",
        header: "Wichtige Aufgaben",
        props:{checked: false, important: true}
    }
}