import React, { useContext } from "react";
import { TaskContext } from "../providers/TasksProvider";
import styles from "../../styles/task.module.css";

const Task = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  const toggleTaskColors = (task) => {
    const colorsSelector = document.getElementById(`colors${task.id}`);
    const isNotVisible =
      colorsSelector.style.display === "none" ||
      colorsSelector.style.display === "";

    colorsSelector.style.display = isNotVisible ? "flex" : "none";
  };

  return (
    <li className={styles.task} key={task.id}>
      <div className={styles.task_color}>
        <span
          style={{ backgroundColor: task.color }}
          className={styles.task_color_circle}
          onClick={() => toggleTaskColors(task)}
        ></span>

        {/* Color picker */}
        <div id={`colors${task.id}`} className={styles.change_color}>
          <span
            onClick={() => {
              updateTask({ ...task, color: "red" });
              toggleTaskColors(task);
            }}
            style={{ backgroundColor: "red" }}
            className={styles.task_color_circle}
          ></span>
          <span
            onClick={() => {
              updateTask({ ...task, color: "green" });
              toggleTaskColors(task);
            }}
            style={{ backgroundColor: "green" }}
            className={styles.task_color_circle}
          ></span>
          <span
            onClick={() => {
              updateTask({ ...task, color: "blue" });
              toggleTaskColors(task);
            }}
            style={{ backgroundColor: "blue" }}
            className={styles.task_color_circle}
          ></span>
        </div>
      </div>

      <span className={styles.task_title}>{task.title}</span>
      <span
        className={styles.task_status}
        style={{ backgroundColor: task.complete ? "green" : "red" }}
        onClick={() => updateTask({ ...task, complete: !task.complete })}
      >
        {task.complete ? "Done" : "Not completed"}
      </span>
      <span onClick={() => deleteTask(task.id)} className={styles.delete_btn}>
        X
      </span>
    </li>
  );
};

export default Task;
