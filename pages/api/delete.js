// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks, deleteTask } from "./_tasks";

export default (req, res) => {
  deleteTask(req.body.id);
  res.status(200).json(tasks);
};
