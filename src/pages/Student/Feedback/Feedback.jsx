import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Input } from "reactstrap";

function Feedback() {
  const [rate, setRate] = useState(1);
  const [group, setGroup] = useState({});
  const isUser = localStorage.getItem("user");
  const user = JSON.parse(isUser);
  const handleSubmit = async () => {
    try {
      if (group.gid && user.uid && rate && group.tid) {
        const response = await fetch(
          `http://localhost/officialpsas/api/psas_supervisor_expert/PostingRateOfSupervisorByGraduatedStudent?st_id=${user.uid}&tid=${group.tid}&gid=${group.gid}&rate=${rate}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.text();
        console.log(result);
        if (result) {
          alert(result);
        }
      } else {
        alert("Require Fields must be filled");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClear = () => {
    setRate(1);
  };
  const GetTheGroupAndSupervisorOnRegNumber = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas_supervisor_expert/GetTheGroupAndSupervisorOnRegNumber?regNo=${user.uid}`
      );
      const result = await response.json();
      console.log(result);
      if (Array.isArray(result) || typeof result === "object") {
        setGroup(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetTheGroupAndSupervisorOnRegNumber();
  }, []);
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center min-[320px]:w-[320px]">
        <h1 className="text-center text-green-500">Give Feedback</h1>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex justify-center items-center">
            <span>Group:</span>
            <span className="font-normal text-[12px]">
              {group && group?.projectTitle}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span>Supervisor:</span>
            <span className="font-normal text-xs">
              {group && group?.teacherName}
            </span>
          </div>

          <div className="flex justify-around items-center space-x-2">
            <span>Rate out of 5:</span>
            <div className="flex">
              <Input
                type="number"
                min={1}
                max={5}
                maxLength={1}
                minLength={1}
                value={rate}
                onChange={(e) => {
                  e.preventDefault();
                  setRate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-around items-center  mt-3 ">
            <Button variant="secondary" onClick={handleClear}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Feedback;
