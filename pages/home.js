import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TaskContext } from "./providers/TasksProvider";
import { AuthContext } from "./providers/AuthProvider";
import Head from "next/head";
import Task from "./components/Task";
import styles from "./styles/main.module.css";

export default function Home() {
  const router = useRouter();
  const { tasks, setTasks, createTask } = useContext(TaskContext);
  const { user, logout } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    title: "",
    color: "red",
  });
  const apiUrl = "https://task-test.vercel.app/api/tasks";

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    fetch(`${apiUrl}/list`, { method: "POST", body: user.uid })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <nav className={styles.nav}>
        <button onClick={logout}>Sign Out</button>
      </nav>
      <div className={styles.container}>
        <Head>
          <title>Next JS - Task Manager</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1>Welcome to your task manager!</h1>

          <ul className={styles.tasks_list}>
            {tasks?.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </ul>

          {/* Add task form */}
          <form
            onSubmit={(e) => {
              createTask(e, inputs);
              setInputs({ title: "" });
            }}
            className={styles.add_form}
          >
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
    </>
  );
}
