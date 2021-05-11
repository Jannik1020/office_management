import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import Task from "./Components/Task";
import { defaultSections } from "../../util/constants";

const createTask = ({
  title,
  id = nanoid(),
  checked = false,
  important = false,
  section = defaultSections.TASKS,
}) => (
  <Task
    key={id}
    id={id}
    title={title}
    checked={checked}
    important={important}
    section={section}
  />
);

const initialState = {
  completedTasks: { tasks: [], header: defaultSections.TASKS_COMPLETED.header },
  tasks: { tasks: [], header: defaultSections.TASKS.header },
  importantTasks: { tasks: [], header: defaultSections.TASKS_IMPORTANT.header },
}; // section: tasks, collapsed, header

export const fetchTasks = createAsyncThunk("/tasks/findAll", async (userId) => {
  return await fetch("../../../api/tasks/find/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log("Error fetching tasks: " + err));
});

export const updateTaskDB = createAsyncThunk(
  "/tasks/update",
  async ([taskId, currentSection, toUpdate, userId]) => {
    const data = await fetch("../../../api/tasks/update/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: taskId,
        toUpdate: toUpdate,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error updating task: " + err));

    return [data, currentSection];
  }
);

export const addTaskDB = createAsyncThunk(
  "/tasks/create",
  async ([task, userId]) => {
    return fetch("../../../api/tasks/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { ...task, userId: userId } }),
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error updating task: " + err));
  }
);

export const removeTaskDB = createAsyncThunk(
  "/tasks/remove",
  async ([taskId, userId]) => {
    return fetch("../../../api/tasks/remove/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, userId: userId }),
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error updating task: " + err));
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addSection: (state, action) => {
      //action.payload: section header
      const [section, header] = action.payload;
      state[section] = { tasks: [], header: header };
    },
    editTask: (state, action) => {
      //action.payload: id, title, section
      const [id, title, section] = action.payload;

      const editedTask = state[section.name].tasks.filter(
        (task) => task.props.id === id
      )[0];
      const indexEditedTask = state[section.name].tasks.findIndex(
        (task) => task.props.id === id
      );

      editedTask.props.title = title;

      state[section.name].tasks[indexEditedTask] = editedTask;
    },
  },
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      const tasks = action.payload;

      //state.status = "idle"

      tasks.forEach((task) =>
        state[task.section].tasks.unshift(
          createTask({
            title: task.title,
            id: task.id,
            checked: task.checked,
            important: task.important,
            section: Object.entries(defaultSections).filter(
              (section) => section[1].name === task.section
            )[0][1],
          })
        )
      );
    },
    [updateTaskDB.fulfilled]: (state, action) => {
      const sectionFrom = action.payload[1];
      const updatedTask = action.payload[0].task;

      //state.status = "idle"

      state[sectionFrom.name].tasks = state[sectionFrom.name].tasks.filter(
        (task) => task.props.id !== updatedTask.id
      );

      var newTask = createTask({
        title: updatedTask.title,
        id: updatedTask.id,
        important: updatedTask.important,
        checked: updatedTask.checked,
        section: Object.entries(defaultSections).filter(
          (section) => section[1].name === updatedTask.section
        )[0][1],
      });

      state[newTask.props.section.name].tasks.unshift(newTask);
    },
    [addTaskDB.fulfilled]: (state, action) => {
      const task = action.payload.task;

      //state.status = "idle"

      state[task.section].tasks.unshift(
        createTask({
          title: task.title,
          id: task.id,
          checked: task.checked,
          important: task.important,
          section: Object.entries(defaultSections).filter(
            (section) => section[1].name === task.section
          )[0][1],
        })
      );
    },
    [removeTaskDB.fulfilled]: (state, action) => {
      const task = action.payload.task;
      //state.status = "idle"

      state[task.section].tasks = state[task.section].tasks.filter(
        (iTask) => iTask.props.id !== task.id
      );
    },
  },
});

export const { addSection, addTask, removeTask, updateTask, editTask } =
  tasksSlice.actions;
export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;
