import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "./providers/TasksProvider";
import Head from "next/head";
import styles from "../styles/main.module.css";

export default function Home() {
  const { tasks, setTasks, createTask, updateTask, deleteTask } = useContext(
    TaskContext
  );
  const [inputs, setInputs] = useState({
    title: "",
    color: "red",
  });
  const apiUrl = "http://localhost:3000/api/tasks";

  useEffect(() => {
    fetch(`${apiUrl}/list`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const toggleTaskColors = (task) => {
    const colorsSelector = document.getElementById(`colors${task.id}`);
    const isNotVisible =
      colorsSelector.style.display === "none" ||
      colorsSelector.style.display === "";

    colorsSelector.style.display = isNotVisible ? "flex" : "none";
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS - Task Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to your task manager!</h1>
        <ul className={styles.tasks_list}>
          {tasks?.map((task) => (
            <li className={styles.task} key={task.id}>
              <div>
                <span
                  style={{ backgroundColor: task.color }}
                  className={styles.task_color}
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
                    className={styles.task_color}
                  ></span>
                  <span
                    onClick={() => {
                      updateTask({ ...task, color: "green" });
                      toggleTaskColors(task);
                    }}
                    style={{ backgroundColor: "green" }}
                    className={styles.task_color}
                  ></span>
                  <span
                    onClick={() => {
                      updateTask({ ...task, color: "blue" });
                      toggleTaskColors(task);
                    }}
                    style={{ backgroundColor: "blue" }}
                    className={styles.task_color}
                  ></span>
                </div>
              </div>
              <span>{task.title}</span>
              <span
                className={styles.task_status}
                style={{ backgroundColor: task.complete ? "green" : "red" }}
                onClick={() =>
                  updateTask({ ...task, complete: !task.complete })
                }
              >
                {task.complete ? "Completed" : "Not completed"}
              </span>
              <span
                onClick={() => deleteTask(task.id)}
                className={styles.delete_btn}
              >
                X
              </span>
            </li>
          ))}
        </ul>

        {/* Add tasks */}
        <form onSubmit={(e) => createTask(e)} className={styles.add_form}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              className={styles.add_input}
              type="text"
              placeholder="Title..."
              name="title"
              id="title"
              value={inputs.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="color">Color tag:</label>
            <select
              placeholder="Color..."
              onChange={(e) => handleChange(e)}
              className={styles.add_input}
              name="color"
              id="color_select"
            >
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div>
            <label htmlFor="add">Add Task:</label>
            <button type="submit" className={styles.add_btn}>
              +
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
