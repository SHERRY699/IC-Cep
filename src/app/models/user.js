import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  courses: [
    {
      courseId: String,
      grade: String,
    },
  ],
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
