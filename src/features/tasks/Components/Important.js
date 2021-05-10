import React, { useEffect, useState, useRef } from "react"
import styles from "./Important.module.css"

import {useDispatch, useSelector} from "react-redux"

import {updateTaskDB} from "../tasksSlice"
import {defaultSections} from "../../../util/constants"
import {selectUser} from "../../user/userSlice";

export default function Delete (props) {

  const firstRender = useRef(true);
  const [important, setImportant] = useState(props.important);
  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  function handleClick () {
    setImportant(!important)
  }

  useEffect(() => {
    if(!firstRender.current){
      if(important) {
        const section = defaultSections.TASKS_IMPORTANT
        dispatch(updateTaskDB([props.id, props.section,{...section.props, "section": section.name}, user.id]))
      }
      else {
        const section = defaultSections.TASKS
        dispatch(updateTaskDB([props.id, props.section, {...section.props, "section": section.name}, user.id]))
      }
    }
  }, [important, props.section, dispatch, props.id, user.id])

  useEffect (() => {
    firstRender.current = false
  }, [])

  var color = (important ? "red" : "#999")

  return (
    <div className={styles.icImportant} onClick={handleClick} style={{color: color}}>
      !
    </div>
  )
} 