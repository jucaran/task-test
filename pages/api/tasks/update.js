// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks, updateTask } from "./_tasks";

export default (req, res) => {
  updateTask(JSON.parse(req.body));
  res.status(200).json(tasks);
};
