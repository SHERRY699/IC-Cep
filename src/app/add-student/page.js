"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddStudentPage = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courses, setCourses] = useState([{ courseId: "", grade: "" }]);
  const router = useRouter();

  const handleNameChange = (e) => setName(e.target.value);
  const handleStudentIdChange = (e) => setStudentId(e.target.value);

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { courseId: "", grade: "" }]);
  };

  const handleRemoveCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      studentId,
      courses,
    };

    try {
      // Send the new student data to the backend API
      const response = await axios.post("/api/user", newStudent);
      if (response.status === 200) {
        alert("Student added successfully!");
        // Reset the form
        setName("");
        setStudentId("");
        setCourses([{ courseId: "", grade: "" }]);
      }
      router.push("/");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Add New Student</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Name */}
          <div>
            <label className="block text-lg">Student Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
              required
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-lg">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={handleStudentIdChange}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
              required
            />
          </div>

          {/* Courses */}
          <div>
            <h2 className="text-lg font-semibold">Courses</h2>
            {courses.map((course, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-1/2">
                  <label className="block">Course ID</label>
                  <input
                    type="text"
                    value={course.courseId}
                    onChange={(e) =>
                      handleCourseChange(index, "courseId", e.target.value)
                    }
                    className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block">Grade</label>
                  <input
                    type="text"
                    value={course.grade}
                    onChange={(e) =>
                      handleCourseChange(index, "grade", e.target.value)
                    }
                    className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-full"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCourse(index)}
                  className="bg-red-600 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCourse}
              className="bg-blue-600 text-white p-2 rounded mt-4"
            >
              Add Course
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPage;
