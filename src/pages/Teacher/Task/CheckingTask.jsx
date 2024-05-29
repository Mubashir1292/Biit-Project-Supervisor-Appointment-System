import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import Table from "react-bootstrap/Table";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function CheckingTask() {
  const [semester, setSemester] = useState(7);
  const [selection, setSelection] = useState(null);
  const [taskSelection, setTaskSelection] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [membersInfo, setMembersInfo] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const allgroups = [
      {
        label: 1,
        semester: 7,
        value: "AI Health Engine",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
      {
        label: 2,
        semester: 7,
        value: "BIIT Career Counsling",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
      {
        label: 5,
        semester: 8,
        value: "BIIT Project Supervisor Appointment System",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
      {
        label: 6,
        semester: 8,
        value: "BIIT Meeting Management System",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
    ];

    const filteredGroups = allgroups.filter(
      (item) => item.semester === semester
    );
    setGroups(filteredGroups);
  }, [semester]);

  const handleSelect = (option) => {
    setSelection(option);
    const tasksList = [
      {
        label: 1,
        group: "BIIT Meeting Management System",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 2,
        group: "BIIT Meeting Management System",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 3,
        group: "BIIT Project Supervisor Appointment System",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 4,
        group: "BIIT Career Counsling",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 5,
        group: "BIIT Career Counsling",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
    ];
    const filterTaskGroup = tasksList.filter(
      (item) => item.group === option.value
    );
    setTasks(filterTaskGroup);

    const initialMembersInfo = option.groupsMembers.map((member) => ({
      id: member.id,
      name: member.name,
      status: false,
      comments: "",
    }));
    setMembersInfo(initialMembersInfo);
  };

  const handleSelectTask = (option) => {
    setTaskSelection(option);
  };

  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
    setSelection(null);
    setTaskSelection(null);
    setTasks([]);
    setMembersInfo([]);
  };

  const handleStatusChange = (id) => {
    setMembersInfo((prevMembersInfo) =>
      prevMembersInfo.map((member) =>
        member.id === id ? { ...member, status: !member.status } : member
      )
    );
  };

  const handleCommentsChange = (id, comments) => {
    setMembersInfo((prevMembersInfo) =>
      prevMembersInfo.map((member) =>
        member.id === id ? { ...member, comments } : member
      )
    );
  };

  const handleSubmit = () => {
    console.log(membersInfo);
  };
  const handleCancel = () => {
    setMembersInfo((prevMembersInfo) =>
      prevMembersInfo.map((member) => ({
        ...member,
        status: false,
        comments: "",
      }))
    );
  };
  return (
    <React.Fragment>
      <div className="flex flex-col max-[320px]:w-[320px]">
        <img
          src={BiitSAS}
          alt="Biit-SAS"
          className="max-[320px]:w-8/12 flex self-center"
        />
        <h3 className="text-center font-normal text-green-500">
          Update Progress
        </h3>
        <div className="flex justify-center">
          <h6
            className={`cursor-pointer ${
              semester === 7
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            } px-16 py-2 max-[320px]:px-8 max-[320px]:py-2 max-[320px]:text-xs  transition-all border-b border-gray-400 rounded-sm`}
            onClick={() => handleSemesterChange(7)}
          >
            Fyp-01
          </h6>
          <h6
            className={`cursor-pointer ${
              semester === 8
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            } px-16 py-2 max-[320px]:px-8 max-[320px]:py-2 max-[320px]:text-xs border-b border-gray-400 transition-all rounded-sm`}
            onClick={() => handleSemesterChange(8)}
          >
            Fyp-02
          </h6>
        </div>
        <div className="flex justify-center max-[320px]:space-x-0 space-x-5 items-center">
          <span className="max-[320px]:text-xs text-sm">Select Group:</span>
          <Dropdown
            options={groups}
            value={selection}
            OnSelect={handleSelect}
            className="relative  max-[320px]:w-3/6 w-2/12 cursor-default max-[320px]:text-xs text-sm"
          />
        </div>
        <div className="border-2 border-green-500 mt-3 max-[320px]:w-full w-4/12 flex flex-col self-center p-2 rounded-md">
          <div className="flex justify-center items-center max-[320px]:space-x-0 space-x-5">
            <span className="max-[320px]:text-xs text-sm">Select Task:</span>
            <Dropdown
              options={tasks}
              value={taskSelection}
              OnSelect={handleSelectTask}
              className="relative max-[320px]:w-8/12 w-5/12 cursor-default"
            />
          </div>
          {!taskSelection ? (
            <div className="w-2/6 mt-3 mx-auto">
              <SkeletonTheme highlightColor="#05B05B">
                <Skeleton count={4} />
              </SkeletonTheme>
            </div>
          ) : (
            <>
              <span className="text-end text-[10px] mt-2">
                Due Date : {taskSelection.dueDate}
              </span>
              <Table bordered hover className="mt-2">
                <thead>
                  <tr>
                    <th className="text-sm">Name</th>
                    <th className="text-sm">Task Status</th>
                    <th className="text-sm text-center">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {membersInfo.map((member) => (
                    <tr key={member.id}>
                      <td className="text-[10px]">{member.name}</td>
                      <td className="text-center">
                        <div className="w-full flex justify-center items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={member.status}
                            onChange={() => handleStatusChange(member.id)}
                          />
                          <span className="text-[8px]">Completed</span>
                        </div>
                      </td>
                      <td>
                        <InputGroup size="sm">
                          <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder="Comments..."
                            className="text-[10px]"
                            value={member.comments}
                            onChange={(e) =>
                              handleCommentsChange(member.id, e.target.value)
                            }
                          />
                        </InputGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          <div className="flex justify-center items-center space-x-3">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckingTask;
