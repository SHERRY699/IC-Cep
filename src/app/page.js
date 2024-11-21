"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    axios
      .get("/api/user")
      .then(({ data }) => setStudents(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Student Grades</h1>
        <div className="flex justify-end mb-4">
          <Link href={"/add-student"}>Add Grades</Link>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Student Name</th>
              <th className="border border-gray-700 px-4 py-2">Student ID</th>
              <th className="border border-gray-700 px-4 py-2">Course</th>
              <th className="border border-gray-700 px-4 py-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) =>
                selectedCourse
                  ? student.courses.some(
                      (course) => course.courseId === selectedCourse
                    )
                  : true
              )
              .map((student) =>
                student.courses.map((course, index) => (
                  <tr key={index} className="text-center hover:bg-gray-800">
                    <td className="border border-gray-700 px-4 py-2">
                      {student.name}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {student.studentId}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {course.courseId}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {course.grade}
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
