// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "./firebase";
import { listTasks } from "./list";

export default async (req, res) => {
  const { userId, taskId } = JSON.parse(req.body);
  try {
    await db.collection(userId).doc(taskId).delete();

    // Gets updated task list
    const tasks = await listTasks(userId);
    // And sends it to the client
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
