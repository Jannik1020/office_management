import "./AddView.css"
import {BsPlus} from "react-icons/bs"
import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {defaultSections} from "../../../util/constants"
import {addTaskDB} from "../tasksSlice"
import {selectUser} from "../../user/userSlice";

export default function AddView() {
    const [title, setTitle] = useState("");
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(addTaskDB([{
            title: title,
            section: defaultSections.TASKS.name,
            checked: defaultSections.TASKS.props.checked,
            important: defaultSections.TASKS.props.important,
        }, user.id]))
        //dispatch(addTask([title, defaultSections.TASKS]));

        setTitle("")
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    function handleInput(e) {
        setTitle(e.target.value);
    }

    return (
        <div className="add-view">
            <div className="add-btn">
                <BsPlus className="ic-add-btn" onClick={handleSubmit}/>
            </div>
            <div className="add-field">
                <input type="input" placeholder="Neue Aufgabe" className="add-field-input" value={title}
                       onKeyPress={handleKeyDown} onChange={handleInput}/*onKeyPress={}*//>
            </div>
        </div>
    )
}