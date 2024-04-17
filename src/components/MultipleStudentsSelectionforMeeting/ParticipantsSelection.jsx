import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const RequestedStudentsDropdown = ({ students, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
    onSelect(selectedStudents);
  };

  return (
    <div className="relative ">
      <button
        onClick={toggleDropdown}
        className="bg-white py-1 px-2 rounded inline-flex space-x-1 items-center w-full border border-gray-500"
      >
        <span>{students[0].id || ""} </span> <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md ">
          {students.map((student, index) => (
            <label key={index} className="flex items-center px-2 py-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={selectedStudents.includes(student.id)}
                onChange={() => toggleSelection(student.id)}
              />
              <span className="ml-2 border-b border-gray-500">
                {student.id}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestedStudentsDropdown;
