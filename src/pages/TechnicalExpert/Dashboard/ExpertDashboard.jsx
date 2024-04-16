import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";
import biitlogo from "../../../assets/extra/biitSAS.png";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Cards/Card";
import { CircleDotDashed, GitPullRequest } from "lucide-react";
import AppointmentCard from "../../../components/Cards/AppointmentCard";
import MessageCard from "../../../components/Cards/MessageCard";
function ExpertDashboard() {
  const navigate = useNavigate();
  const [handleDuration, setHandleDuration] = useState("");
  const [options, setOptions] = useState([]);

  const handleGetOptions = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.4/OfficialPSAS/api/psas/GetAllDuration"
      );
      const data = await response.json();
      if (data) {
        setOptions(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      console.log(user);
    } else {
      navigate("/");
    }
    handleGetOptions();
  }, []);

  const handleDurationSelect = (option) => {
    setHandleDuration(option);
  };

  return (
    <div className="w-full h-full p-1 bg-gray-50">
      <div className="flex justify-center">
        <img src={biitlogo} alt="biit Logo" />
      </div>
      <Dropdown
        label="Today"
        options={options}
        value={handleDuration}
        OnSelect={handleDurationSelect}
        className="relative w-2/12"
      />
      <div className="w-full h-auto flex flex-row justify-around pt-10">
        <Card icon={<GitPullRequest />} title="Help Requests" desc={3} />
        <Card icon={<GitPullRequest />} title="Approved Requests" desc="03" />
      </div>
      <div className="mt-10 h-3/6 flex flex-row justify-around pt-3">
        <AppointmentCard />
        <MessageCard />
      </div>
    </div>
  );
}

export default ExpertDashboard;
