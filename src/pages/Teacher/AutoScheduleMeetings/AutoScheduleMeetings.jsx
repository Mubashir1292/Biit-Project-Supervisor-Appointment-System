import React, { useEffect, useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import { Button, Form, InputGroup } from "react-bootstrap";
import Dropdown from "../../../components/dropdown/Dropdown";
function ScheduleMeetings() {
  const [group, setGroup] = useState("");
  const [frequency, setFrequency] = useState();
  const [allGroups, setAllGroups] = useState([]);
  const UserString = localStorage.getItem("user");
  const user = UserString ? JSON.parse(UserString) : null;

  const allOptions = [
    {
      label: 1,
      value: 1,
    },
    {
      label: 2,
      value: 2,
    },
    {
      label: 3,
      value: 3,
    },
    {
      label: 4,
      value: 4,
    },
  ];

  const handleFrequencySelect = (option) => {
    setFrequency(option);
  };
  const handleSubmit = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllocatedGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/AllocatedGroups?teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllGroups(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllocatedGroups();
  }, []);
  const handleGroupSelect = (option) => {
    setGroup(option);
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex flex-col justify-center items-center">
          <img src={BiitSAS} alt="Biit SAS" className="w-full" />
          <h4 className="text-green-500">Auto Schedule Meetings</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center space-x-2">
          <Form.Label>Select Group:</Form.Label>
          <Dropdown
            options={allGroups}
            OnSelect={handleGroupSelect}
            className="relative w-4/6"
            value={group}
          />
        </div>
        <div className="flex  justify-center items-center space-x-1">
          <Form.Label>Frequency per week:</Form.Label>
          <Dropdown
            options={allOptions}
            className="relative w-2/6"
            value={frequency}
            OnSelect={handleFrequencySelect}
          />
        </div>
        <div className="flex justify-around items-center mt-3">
          <Button variant="success" type="submit">
            Schedule Meetings
          </Button>
          <Button variant="secondary" type="submit">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}

export default ScheduleMeetings;
