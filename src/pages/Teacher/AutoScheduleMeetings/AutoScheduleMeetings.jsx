import React, { useEffect, useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import { Form } from "react-bootstrap";
import Dropdown from "../../../components/dropdown/Dropdown";
function ScheduleMeetings() {
  const [group, setGroup] = useState("");
  const [frequency, setFrequency] = useState(1);
  const [allGroups, setAllGroups] = useState([]);
  const UserString = localStorage.getItem("user");
  const user = UserString ? JSON.parse(UserString) : null;

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
        <div>
          <Form.Label>Select Group:</Form.Label>
          <Dropdown
            options={allGroups}
            OnSelect={handleGroupSelect}
            className="relative w-5/6l0"
            value={group}
          />
        </div>
        <div>
          <label>Frequency per week:</label>
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
            min="1"
            max="7"
          />
        </div>
        <button type="submit">Schedule Meetings</button>
      </form>
    </>
  );
}

export default ScheduleMeetings;
