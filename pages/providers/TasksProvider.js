import React, { useState } from "react";

export const TaskContext = React.createContext({
  tasks: [],
  setTasks: () => {},
  createTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const apiUrl = "http://localhost:3000/api/tasks";

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask: async (e) => {
          e.preventDefault();
          fetch(`${apiUrl}/create`, {
            method: "POST",
            body: JSON.stringify(inputs),
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
        },
        updateTask: (task) => {
          fetch(`${apiUrl}/update`, {
            method: "POST",
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
        },
        deleteTask: (taskId) => {
          fetch(`${apiUrl}/delete`, {
            method: "DELETE",
            body: taskId,
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
