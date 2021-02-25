// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "./firebase";
import { listTasks } from "./list";

export default async (req, res) => {
  const { userId, title, color, id } = JSON.parse(req.body);

  try {
    await db.collection(userId).doc().set({
      title,
      color,
      complete: false,
    });
  } catch (err) {
    console.log(err);
  }

  // Gets the updated list
  const tasks = await listTasks(userId);

  // And sends it to client
  res.status(200).json(tasks);
};
