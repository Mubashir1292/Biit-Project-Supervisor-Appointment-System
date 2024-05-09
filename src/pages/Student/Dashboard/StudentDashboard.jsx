import React, { useEffect, useState } from "react";
import biitlogo from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import AppointmentCard from "../../../components/Cards/AppointmentCard";
import MessageCard from "../../../components/Cards/MessageCard";
import TaskList from "../../../components/Cards/TaskList";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

function StudentDashboard() {
  const [options, setOptions] = useState([]);
  const [sentRequest, setSentRequest] = useState([]);
  const [isUser, setIsUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
  const handleGetRequests = async (user) => {
    try {
      setIsUser(user);
      const response = await fetch(
        `http://192.168.100.4/officialPSAS/api/psas/getAllRequests?Id=${user.uid}`
      );
      const data = await response.json();
      if (data.length) {
        setSentRequest(data);
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
    handleGetRequests(user);
  }, []);

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
          <Card>
            <CardHeader>Sent Group Requests</CardHeader>
            <CardBody>
              <CardTitle className="text-center">
                {sentRequest.length}
              </CardTitle>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Appointment Requests</CardHeader>
            <CardBody>
              <CardTitle className="text-center">
                {sentRequest.length}
              </CardTitle>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Project Requests</CardHeader>
            <CardBody>
              <CardTitle className="text-center">
                {sentRequest.length}
              </CardTitle>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Joining Requests</CardHeader>
            <CardBody>
              <CardTitle className="text-center font-bold">
                {sentRequest.length}
              </CardTitle>
            </CardBody>
          </Card>
        </div>
        {/* <div className="mt-10 h-3/6 flex flex-row justify-around pt-3">
          <AppointmentCard />
          <MessageCard />
          <TaskList />
        </div> */}
      </div>
    </>
  );
}

export default StudentDashboard;
