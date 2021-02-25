import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const TaskContext = React.createContext({
  tasks: [],
  setTasks: () => {},
  createTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const apiUrl = "https://task-test.vercel.app";

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask: async (e, inputs) => {
          e.preventDefault();
          fetch(`${apiUrl}/create`, {
            method: "POST",
            body: JSON.stringify({ ...inputs, userId: user.uid }),
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
        },
        updateTask: (task) => {
          fetch(`${apiUrl}/update`, {
            method: "POST",
            body: JSON.stringify({ ...task, userId: user.uid }),
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
        },
        deleteTask: (taskId) => {
          fetch(`${apiUrl}/delete`, {
            method: "DELETE",
            body: JSON.stringify({ userId: user.uid, taskId }),
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
