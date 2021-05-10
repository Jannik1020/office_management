import { useSelector } from "react-redux";
import { selectTasks } from "../tasksSlice";
import styles from "./TaskView.module.css";
import { ImArrowDown } from "react-icons/im";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

function SectionHeader(props) {
  function handleClick() {
    props.onClick();
  }

  return (
    <div
      className={`${styles.sectionHeader} ${styles[props.section]}`}
      onClick={handleClick}
    >
      <div className={styles.icSectionWrapper}>
        {props.collapsed ? (
          <RiArrowDownSLine
            className={styles.icSection}
            style={{ transform: "rotate(-90deg)" }}
          />
        ) : (
          <RiArrowDownSLine className={styles.icSection} />
        )}
      </div>
      <div className={styles.headerTitle}>{props.header}</div>
    </div>
  );
}

function Section(props) {
  //props: section, header, content, collapsed, class

  const [collapsed, setCollapsed] = useState(props.collapsed);

  function handleCollapse() {
    setCollapsed(!collapsed);
  }

  return (
    <div className={styles.taskSection}>
      <SectionHeader
        header={props.header}
        section={props.section}
        onClick={handleCollapse}
        collapsed={collapsed}
      />
      {!collapsed && <ul className={`${styles.taskList}`}>{props.content}</ul>}
    </div>
  );
}

export default function TaskView() {
  const taskSections = useSelector(selectTasks); //{tasks, header}
  return (
    <div className={styles.taskView}>
      {
        Object.entries(taskSections).filter(
        (section) => section[1].tasks.length !== 0
      ).length === 0 ? (
        <div className={styles.defaultText}>
          Füge eine Aufgabe hinzu!
          <ImArrowDown className={styles.defaultIcon}/>
        </div>
      ) : (
        <div className={styles.sections}>
          {Object.keys(taskSections).map(
            (sectionName) =>
              taskSections[sectionName].tasks.length > 0 && (
                <Section
                  key={sectionName}
                  section={sectionName}
                  header={taskSections[sectionName].header}
                  content={taskSections[sectionName].tasks}
                  collapsed={false}
                />
              )
          )}
        </div>
      )}
    </div>
  );
}
