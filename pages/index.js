import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/main.module.css";

export default function Home() {
  const [tasks, setTasks] = useState(null);
  const apiUrl = "http://localhost:3000/api";
  useEffect(() => {
    fetch(`${apiUrl}/list`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  });

  const updateTask = (task) => {
    const updatedTask = { ...task, complete: !task.complete };
    console.log(updatedTask);
    fetch(`${apiUrl}/update`, {
      method: "POST",
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const deleteTask = () => {};

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
              <span
                style={{ backgroundColor: task.color }}
                className={styles.task_color}
              ></span>
              <span>{task.title}</span>
              <span
                className={styles.task_complete}
                style={{ backgroundColor: task.complete ? "green" : "red" }}
                onClick={() => updateTask(task)}
              >
                {task.complete ? "Completed" : "Not completed"}
              </span>
              <span onClick={deleteTask} className={styles.delete_btn}>
                delete
              </span>
            </li>
          ))}
        </ul>
        <form className={styles.add_form}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              className={styles.add_input}
              type="text"
              placeholder="Title..."
              name="title"
              id="title"
            />
          </div>
          <div>
            <label htmlFor="color">Color: </label>
            <select className={styles.add_input} name="color" id="color_select">
              <option value="#ff0000">Red</option>
              <option value="#00ff00">Green</option>
              <option value="#0000ff">Blue</option>
            </select>
          </div>
          <div>
            <label htmlFor="add">Add Task:</label>
            <button className={styles.add_btn}>+</button>
          </div>
        </form>
      </main>
    </div>
  );
}
