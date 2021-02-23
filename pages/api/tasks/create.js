// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks, createTask } from "./_tasks";

export default (req, res) => {
  createTask(JSON.parse(req.body));
  res.status(200).json(tasks);
};
