import React, {useState, useRef, useEffect} from "react";
import {GiCheckMark} from "react-icons/gi"
import {useDispatch, useSelector} from "react-redux"
import {updateTaskDB} from "../tasksSlice"
import {defaultSections} from "../../../util/constants"
import styles from "./Checkbox.module.css"
import {selectUser} from "../../user/userSlice";

export default function Checkbox (props) { //checked, id, section
    
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const [checked, setChecked] = useState(props.checked);
  const [hovering, setHovering] = useState(false);

  function initHover (){
    setHovering(true)
  }

  function endHover (){
    setHovering(false)
  }

  function handleClick(){   
    setChecked(!checked);
    //dispatch(checkTask([props.id, !checked, props.section]));
  }

  useEffect (() => {      
    if(!firstRender.current){
       if(checked) {
         const section = defaultSections.TASKS_COMPLETED
         dispatch(updateTaskDB([props.id, props.section, {...section.props, "section": section.name}, user.id]))
       }
       else{
         const section = defaultSections.TASKS
         dispatch(updateTaskDB([props.id, props.section, {...section.props, "section": section.name}, user.id]))
       }
    }
  }, [checked, props.id, props.section, dispatch, user.id])

  useEffect (() => {
    firstRender.current = false
  }, [])

  var clrIcon = checked ? "#fff" : "#4caf50";
  var clrBackground = checked ? "#4caf50" : "#fff";
  var visIcon = checked || hovering ? "visible" : "hidden";

  return (
    <div className={styles.checkbox} onClick={handleClick} style={{backgroundColor: clrBackground}} onMouseEnter={initHover} onMouseLeave={endHover}>
      <GiCheckMark className={styles.icCheckbox} style={{color: clrIcon, visibility: visIcon, "&:hover": "visible"}}/>
    </div>
  )    
} 