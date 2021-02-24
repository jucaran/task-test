import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/main.module.css";

export default function Home() {
  const [tasks, setTasks] = useState(null);
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

  const createTask = async (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/create`, {
      method: "POST",
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const updateTask = (task) => {
    fetch(`${apiUrl}/update`, {
      method: "POST",
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const deleteTask = (taskId) => {
    fetch(`${apiUrl}/delete`, {
      method: "DELETE",
      body: taskId,
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const changeTaskStatus = (task) => {
    const updatedTask = { ...task, complete: !task.complete };
    updateTask(updatedTask);
  };

  const changeTaskColor = (task, color) => {
    const updatedTask = { ...task, color: color };
    updateTask(updatedTask);
    toggleTaskColors(task);
  };

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
        <h1>Task manager!</h1>
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
                    onClick={() => changeTaskColor(task, "red")}
                    style={{ backgroundColor: "red" }}
                    className={styles.task_color}
                  ></span>
                  <span
                    onClick={() => changeTaskColor(task, "green")}
                    style={{ backgroundColor: "green" }}
                    className={styles.task_color}
                  ></span>
                  <span
                    onClick={() => changeTaskColor(task, "blue")}
                    style={{ backgroundColor: "blue" }}
                    className={styles.task_color}
                  ></span>
                </div>
              </div>
              <span>{task.title}</span>
              <span
                className={styles.task_status}
                style={{ backgroundColor: task.complete ? "green" : "red" }}
                onClick={() => changeTaskStatus(task)}
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
