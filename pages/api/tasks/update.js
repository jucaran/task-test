// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { tasks, updateTask } from "./_tasks";
import { db } from "./firebase";
import { listTasks } from "./list";

export default async (req, res) => {
  const { userId, id, title, color, complete } = JSON.parse(req.body);

  try {
    // Updates the task in firestore db
    await db.collection(userId).doc(id).set({
      title,
      color,
      complete,
    });

    // Gets the updated tasks list
    const tasks = await listTasks(userId);
    // Sends it to the client
    res.status(200).json(tasks);
  } catch (err) {
    console.log("an error has ocurred: ", err);
    res.status(400).json(err);
  }
};
