export let tasks = [
  {
    id: 1,
    title: "Task #1",
    complete: false,
    color: "#ff0000",
  },
  {
    id: 2,
    title: "Task #2",
    complete: false,
    color: "#0000ff",
  },
  {
    id: 3,
    title: "Task #3",
    complete: false,
    color: "#00ff00",
  },
];

export const updateTask = (task) => {
  tasks = tasks.map((el) => {
    if (el.id === task.id) {
      return task;
    } else return el;
  });
};

export const deleteTask = (id) => {
  tasks = tasks.filter((el) => el.id !== id);
};
