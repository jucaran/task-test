// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks } from "./_tasks";

console.log(tasks);

export default (req, res) => {
  tasks = tasks.map((el) => {
    if (el.id === req.id) {
      return req.task;
    } else return el;
  });
  res.status(200).json(tasks);
};
