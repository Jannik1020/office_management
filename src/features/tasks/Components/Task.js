import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {editTask} from "../tasksSlice"
import Checkbox from "./Checkbox.js"
import Delete from "./Delete"
import Important from "./Important"
/*
import {BiCalendarEvent} from "react-icons/bi"
import {BsBell} from "react-icons/bs"
*/
import styles from "./Task.module.css"

export default function Task(props) {

    const [editable, setEditable] = useState(false);
    const [title, setTitle] = useState(props.title);

    const dispatch = useDispatch()
  
    function handleDoubleClick () {
      setEditable(true)
    }

    function handleInput (e) {
      setTitle(e.target.value);
    }

    function handleSubmit () {
      dispatch(editTask([props.id, title, props.section]))
      setEditable(false)
    }

    function handleKeyPress (e) {
      if(e.key === "Enter") {
        handleSubmit()
      }
    }

    var inputWidth = title.length + "ch";
    var readOnly = !props.checked ? !editable : true;

    /**
     * TODO:
     *  - <input /> soll width abhängig vom content GLEICHMÄßIG verändern
     */

    return (
      <li className={styles.task}>
        <div className={styles.iconWrapper}>
          <Checkbox id={props.id} section={props.section} checked={props.checked} />
        </div>
        <div className={styles.taskDesc}>
          <div className={styles.taskTitle} onDoubleClick={handleDoubleClick}>
            <input style={{width: inputWidth}} value={title} className={styles.text} onChange={handleInput} onBlur={handleSubmit} onKeyPress={handleKeyPress} type="input" readOnly={readOnly} />
            {/*editable ?
              <input value={title} className={styles.textEditable} onChange={handleInput} onBlur={handleSubmit} onKeyPress={handleKeyPress} type="input" />:
              <input value={title} className={styles.textReadOnly} onChange={handleInput} onBlur={handleSubmit} onKeyPress={handleKeyPress} type="input" readOnly />
            */}
          </div>
          {/*<div className={styles.taskExtras}>
            <BsBell className={`${styles.icExtra} ${styles.icBell}`}/>
            <BiCalendarEvent className={`${styles.icExtra} ${styles.icCalendar}`}/>
            bis 07.02.23
          </div>*/}
        </div>
        <div className={styles.iconWrapper}>
          {!props.checked && <Important id={props.id} section={props.section} important={props.important}/> }
        </div>
        <div className={styles.iconWrapper}>
          <Delete id={props.id} section={props.section}/>
        </div>
      </li>
    )
  }