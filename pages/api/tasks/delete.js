// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks, deleteTask } from "./_tasks";

export default (req, res) => {
  deleteTask(parseInt(req.body));
  res.status(200).json(tasks);
};
