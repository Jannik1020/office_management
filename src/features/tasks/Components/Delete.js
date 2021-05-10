import React from "react"
import styles from "./Delete.module.css"

import {IoRemove} from "react-icons/io5"

import {useDispatch, useSelector} from "react-redux"

import {removeTaskDB} from "../tasksSlice"
import {selectUser} from "../../user/userSlice";

export default function Delete (props) {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  function handleClick () {
    dispatch(removeTaskDB([props.id, user.id]));
  }

  return (
    <IoRemove onClick={handleClick} className={styles.icDelete} />
  )
} 