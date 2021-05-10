import TaskView from "./Components/TaskView";
import AddView from "./Components/AddView";
import styles from "./TaskManagement.module.css";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./tasksSlice";
import {selectUser} from "../user/userSlice";

export default function TaskManagement() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    useEffect(() => {
        async function fetch() {
            await dispatch(fetchTasks(user.id))
        }
        fetch();
    }, [dispatch, user.id])

    return (
        <div className={styles.wrapper}>
            <TaskView/>
            <AddView/>
        </div>
    );
}
