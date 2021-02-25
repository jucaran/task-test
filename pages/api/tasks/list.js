import { db } from "./firebase";

export const listTasks = async (userId) => {
  // We create an empty array where we're going to store our parse data
  const tasks = [];

  try {
    // Grab the data from firestore db
    const tasksSnapShot = await db.collection(userId).get();
    tasksSnapShot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (err) {
    console.log(err);
  }

  // And return it to client
  return tasks;
};

export default async (req, res) => {
  const userId = req.body;
  try {
    const tasks = await listTasks(userId);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json(err);
  }
};
