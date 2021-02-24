const apiUrl = "http://localhost:3000/api/tasks";

export const updateTask = (task) => {
  fetch(`${apiUrl}/update`, {
    method: "POST",
    body: JSON.stringify(task),
  })
    .then((res) => res.json())
    .then((data) => setTasks(data));
};

export const deleteTask = (taskId, setTasks) => {
  fetch(`${apiUrl}/delete`, {
    method: "DELETE",
    body: taskId,
  })
    .then((res) => res.json())
    .then((data) => setTasks(data));
};

export const changeTaskStatus = (task) => {
  const updatedTask = { ...task, complete: !task.complete };
  updateTask(updatedTask);
};

export const changeTaskColor = (task, color) => {
  const updatedTask = { ...task, color: color };
  updateTask(updatedTask);
  toggleTaskColors(task);
};

export const createTask = async (e, inputs, setTasks) => {
  e.preventDefault();
  fetch(`${apiUrl}/create`, {
    method: "POST",
    body: JSON.stringify(inputs),
  })
    .then((res) => res.json())
    .then((data) => setTasks(data));
};
