import ConnectDB from "@/app/db/db";
import Student from "@/app/models/user";

export default async function handler(req, res) {
  await ConnectDB();

  if (req.method === "GET") {
    const students = await Student.find({});
    res.status(200).json(students);
  } else if (req.method === "POST") {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  }
}
