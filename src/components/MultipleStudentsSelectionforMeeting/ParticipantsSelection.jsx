import React, { useState } from "react";

const RequestedStudentsDropdown = ({ students, onSelect }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const toggleSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
    onSelect(selectedStudents);
  };

  return (
    <div className="relative w-full">
      <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md">
        {students.map((student, index) => (
          <label key={index} className="flex items-center px-4 py-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked={selectedStudents.includes(student.id)}
              onChange={() => toggleSelection(student.id)}
            />
            <span className="ml-2">{student.id}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RequestedStudentsDropdown;
