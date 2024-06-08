import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import BasicDatePicker from "../../../components/DatePicker/BasicDatePicker";
import Button from "react-bootstrap/Button";

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

  const handleFileSubmit = (e) => {
    setFile(e.target.files[0]);
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
    setTaskDetails({
      title: "",
      description: "",
    });
  };

  return (
    <React.Fragment>
      <div className="flex  flex-col sm:justify-around xl:justify-center w-full max-[320px]:w-[320px]">
        <div className="flex justify-center items-center max-[320px]:w-full w-full">
          <img
            src={BiitSAS}
            alt="Biit SAS Logo"
            className="min-[320px]:w-5/12 w-4/12"
          />
        </div>
        <h3 className="text-center font-normal text-green-500">Assign Task</h3>
        <div className="flex justify-center">
          <h6
            className={`cursor-pointer ${
              semester === 7
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            } max-[320px]:px-8 max-[320px]:py-2 px-28 py-6 transition-all border-b border-gray-400 rounded-sm max-[320px]:text-xs`}
            onClick={() => setSemester(7)}
          >
            Fyp-01
          </h6>
          <h6
            className={`cursor-pointer ${
              semester === 8
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            }  max-[320px]:px-8 max-[320px]:py-2 px-28 py-6 border-b border-gray-400 transition-all rounded-sm max-[320px]:text-xs`}
            onClick={() => setSemester(8)}
          >
            Fyp-02
          </h6>
        </div>
        <div className="flex max-[320px]:justify-around  justify-center items-center">
          <span className="max-[320px]:text-xs text-lg">Select Group:</span>
          <Dropdown
            options={groups}
            value={selection}
            OnSelect={handleSelect}
            className="relative max-[320px]:w-4/6 w-1/6 cursor-default max-[320px]:text-[10px]"
          />
        </div>
        <div className="flex max-[320px]:w-[320px] w-full max-[320px]:justify-center items-center mt-2">
          <div className="border-2 border-green-600 max-[320px]:w-full w-2/6 mx-auto rounded self-center p-3">
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileSubmit} />
            </Form.Group>
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
