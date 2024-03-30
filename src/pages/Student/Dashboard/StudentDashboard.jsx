import React, { useState } from "react";
import Card from "../../../components/Cards/Card";
import biitlogo from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import AppointmentCard from "../../../components/Cards/AppointmentCard";
import MessageCard from "../../../components/Cards/MessageCard";
import TaskList from "../../../components/Cards/TaskList";
import { GitPullRequest } from "lucide-react";

function StudentDashboard() {
  const options = [
    { label: "Today", value: "Today" },
    { label: "last Week", value: "Last Week" },
    { label: "Last Month", value: "Last Month" },
    { label: "Last Six Month", value: "Last Six Month" },
  ];
  const [selection, setSelection] = useState(null);
  const handleSelect = (option) => {
    setSelection(option);
  };

  return (
    <>
      <div className="w-full h-full p-1 bg-gray-50">
        <div className="flex justify-center">
          <img src={biitlogo} alt="biit Logo" />
        </div>
        <Dropdown
          label="Today"
          options={options}
          value={selection}
          OnSelect={handleSelect}
          className="relative w-2/12"
        />
        <div className="w-full h-auto flex flex-row justify-around pt-10">
          <Card
            icon={<GitPullRequest />}
            title="Group Requests"
            desc="02"
            footer="55%"
          />
          <Card
            icon={<GitPullRequest />}
            title="Sent Requests"
            desc="03"
            footer="65%"
          />
          <Card
            icon={<GitPullRequest />}
            title="Current Progress"
            desc="..."
            footer="0%"
          />
        </div>
        <div className="mt-10 h-3/6 flex flex-row justify-around pt-3">
          <AppointmentCard />
          <MessageCard />
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
