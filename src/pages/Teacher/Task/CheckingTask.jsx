import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import Table from "react-bootstrap/Table";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CheckingTask() {
  const [semester, setSemester] = useState(7);
  const [selection, setSelection] = useState();
  const [taskSelection, setTaskSelection] = useState();
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  // do the task list with the group id
  // fetch all group members on the base of the group id,
  // map the group members and set the status of the task and done the changes
  // after saving this do the calendar and done the backend with it..
  useEffect(() => {
    const allgroups = [
      {
        label: 1,
        semester: 7,
        value: "AI Health Engine",
        groupsMembers: [
          {
            id: "2020-Arid-3675",
            name: "Mubashir Liaqat",
          },
          {
            id: "2020-Arid-4224",
            name: "Touseef Sajjad",
          },
          {
            id: "2020-Arid-4225",
            name: "Faheem Abbas",
          },
        ],
      },
      {
        label: 2,
        semester: 7,
        value: "BIIT Career Counsling",
        groupsMembers: [
          {
            id: "2020-Arid-3675",
            name: "Mubashir Liaqat",
          },
          {
            id: "2020-Arid-4224",
            name: "Touseef Sajjad",
          },
          {
            id: "2020-Arid-4225",
            name: "Faheem Abbas",
          },
          {
            id: "2020-Arid-4225",
            name: "Faheem Abbas",
          },
          {
            id: "2020-Arid-4225",
            name: "Faheem Abbas",
          },
        ],
      },
      {
        label: 5,
        semester: 8,
        value: "BIIT Project Supervisor Appointment System",
        groupsMembers: [
          {
            id: "2020-Arid-3675",
            name: "Mubashir Liaqat",
          },
          {
            id: "2020-Arid-4224",
            name: "Touseef Sajjad",
          },
          {
            id: "2020-Arid-4225",
            name: "Faheem Abbas",
          },
          {
            id: "2020-Arid-4225",
            name: "Faheem Abbas",
          },
        ],
      },
      {
        label: 6,
        semester: 8,
        value: "BIIT Meeting Management System",
        groupsMembers: [
          {
            id: "2020-Arid-3675",
            name: "Mubashir Liaqat",
          },
          {
            id: "2020-Arid-4224",
            name: "Touseef Sajjad",
          },
          {
            id: "2020-Arid-4225",
            name: "Faheem Abbas",
          },
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
    // all Task List with groups
    const tasksList = [
      {
        label: 1,
        group: "BIIT Meeting Management System",
        value: "ERD Completion",
      },
      {
        label: 2,
        group: "BIIT Meeting Management System",
        value: "ERD Completion",
      },
      {
        label: 3,
        group: "BIIT Project Supervisor Appointment System",
        value: "ERD Completion",
      },
      {
        label: 4,
        group: "BIIT Career Counsling",
        value: "ERD Completion",
      },
      {
        label: 5,
        group: "BIIT Career Counsling",
        value: "ERD Completion",
      },
    ];
    const filterTaskGroup = tasksList.filter(
      (item) => item.group === option.value
    );
    setTasks(filterTaskGroup);
  };

  const handleSelectTask = (option) => {
    setTaskSelection(option);
  };
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <img src={BiitSAS} alt="Biit-SAS" className="w-3/12 flex self-center" />
        <h3 className="text-center font-normal">Update Progress</h3>
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
        <div className="flex justify-center space-x-5 items-center">
          <span>Select Group:</span>
          <Dropdown
            options={groups}
            value={selection}
            OnSelect={handleSelect}
            className="relative w-2/12 cursor-default"
          />
        </div>
        <div className="border-2 border-green-500 mt-3 w-4/12 flex flex-col self-center p-2 rounded-md">
          <div className="flex justify-center items-center space-x-5">
            <span>Select Task:</span>
            <Dropdown
              options={tasks}
              value={taskSelection}
              OnSelect={handleSelectTask}
              className="relative w-8/12 cursor-default"
            />
          </div>
          {!taskSelection ? (
            <>
              <div className="w-2/6 mt-3 mx-auto">
                <SkeletonTheme highlightColor="#05B05B">
                  <Skeleton count={4} />
                </SkeletonTheme>
              </div>
            </>
          ) : (
            <>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Task Status</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckingTask;
