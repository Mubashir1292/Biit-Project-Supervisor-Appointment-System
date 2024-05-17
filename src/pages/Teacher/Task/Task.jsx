import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import BasicDatePicker from "../../../components/DatePicker/BasicDatePicker";
import DropzoneComponent from "../../../components/DragDrop/DropZone";
import Button from "react-bootstrap/button";
function Task() {
  const [semester, setSemester] = useState(7);
  const [selection, setSelection] = useState();
  const [groups, setGroups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [file, setFile] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    const allgroups = [
      { label: 1, semester: 7, value: "AI Health Engine" },
      { label: 2, semester: 7, value: "BIIT Career Counsling" },
      {
        label: 5,
        semester: 8,
        value: "BIIT Project Supervisor Appointment System",
      },
      {
        label: 6,
        semester: 8,
        value: "BIIT Meeting Management System",
      },
    ];
    const filteredGroups = allgroups.filter(
      (item) => item.semester === semester
    );
    setGroups(filteredGroups);
  }, [semester]);

  const handleSelect = (option) => {
    setSelection(option);
  };

  const handleSubmit = (newDate) => {
    setDate(newDate);
  };

  const handleFileSubmit = (f) => {
    setFile(f);
  };
  const handleDescriptionChange = (e) => {
    setTaskDetails((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleTitleChange = (e) => {
    setTaskDetails((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  /// main Save
  const handleSave = () => {
    if (
      selection &&
      date &&
      file &&
      taskDetails.description &&
      taskDetails.title
    ) {
      const task = {
        selection,
        date,
        file,
        title: taskDetails.title,
        description: taskDetails.description,
      };
      console.log(task);
    } else {
      alert("Fields must not be empty");
    }
  };

  const handleCancel = () => {
    setSelection("");
    setDate("");
    setFile(null);
    setTaskDetails(null);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-around">
        <img
          src={BiitSAS}
          alt="Biit SAS Logo"
          className="w-3/12 flex self-center"
        />
        <h3 className="text-center font-normal">Assign Task</h3>
        <div className="flex justify-center">
          <h6
            className={`cursor-pointer ${
              semester === 7
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            } px-16 py-2 transition-all border-b border-gray-400 rounded-sm`}
            onClick={() => setSemester(7)}
          >
            Fyp-01
          </h6>
          <h6
            className={`cursor-pointer ${
              semester === 8
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            } px-16 py-2 border-b border-gray-400 transition-all rounded-sm`}
            onClick={() => setSemester(8)}
          >
            Fyp-02
          </h6>
        </div>
        <div className="flex justify-center space-x-3 items-center">
          <span>Select Group:</span>
          <Dropdown
            options={groups}
            value={selection}
            OnSelect={handleSelect}
            className="relative w-2/12 cursor-default"
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="border-2 border-green-600 rounded w-2/6 p-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb-1"
            >
              <Form.Control
                type="text"
                placeholder="Enter Title..."
                value={taskDetails.title}
                onChange={handleTitleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInputDateTime" className="mb-1">
              <BasicDatePicker date={date} onSubmit={handleSubmit} />
            </FloatingLabel>
            <DropzoneComponent onSubmit={handleFileSubmit} />
            <FloatingLabel
              controlId="floatingInput"
              label="Description"
              className="mb-1"
            >
              <Form.Control
                type="textarea"
                placeholder="Enter Description..."
                value={taskDetails.description}
                onChange={handleDescriptionChange}
                className="mt-2"
                style={{ height: "70px" }}
              />
            </FloatingLabel>
            <div className="flex justify-center items-center space-x-7 mt-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button variant="outline-success" size="md" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Task;
