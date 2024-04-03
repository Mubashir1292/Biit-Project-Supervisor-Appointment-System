import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import ProgressTable from "../../../components/Table/ProgressTable";
function Progress() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const allTaskList = [
      {
        title: "Code of Compiler",
        members: [
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
        ],
        date: "2024-04-01",
      },
      {
        title: "Code of Compiler",
        members: [
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
        ],
        date: "2024-04-01",
      },
      {
        title: "Code of Compiler",
        members: [
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
          {
            name: "Mubashir Liaqat",
            status: "Completed",
            marks: 9,
          },
        ],
        date: "2024-04-01",
      },
    ];
    setAllTasks((prevTasks) => [...prevTasks, ...allTaskList]);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-center">
          <img src={BiitSAS} alt="BiitSAS" className="w-4/12" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold font-mono">Progress</h1>
        </div>
        <div className="bg-green-600 flex justify-center">
          <ProgressTable data={allTasks} />
        </div>
      </div>
    </>
  );
}

export default Progress;
