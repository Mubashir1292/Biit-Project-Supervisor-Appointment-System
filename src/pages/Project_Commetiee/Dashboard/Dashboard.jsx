import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import biitSas from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState();
  const [supervisingRequests, setSupervisorRequests] = useState([]);
  const [groupJoining, setGroupJoining] = useState([]);
  const [genericProjectRequests, setGenericProjectRequests] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const navigate = useNavigate();

  const GetAllNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/GetAllNotifications`
      );
      const result = await response.json();
      if (result) {
        console.log(result);
        setGroupJoining(result.Students_Requests_For_GroupJoining || []);
        setSupervisorRequests(result.Superising_Approval_Requests || []);
        setGenericProjectRequests(result.Generic_Project_Requests || []);
        setAllNotifications(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      setUser(user);
    } else navigate("/");

    GetAllNotifications();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-center ">
          {/* setting the image of the Biit Logo */}
          <img src={biitSas} alt="Biit Logo" />
        </div>
        <div className="grid grid-cols-3 max-[320px]:grid-cols-1 max-[320px]:w-[320px]  mt-3">
          <Card className="w-[16rem] max-[320px]:w-full my-1">
            <Card.Header className="font-bold text-[13px] text-center">
              Supervising Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">
                  {supervisingRequests.length || 0}
                </span>
                <span>
                  {supervisingRequests.length > 0 ? (
                    <ArrowUpWideNarrow className="text-2xl" />
                  ) : (
                    <ArrowDownWideNarrow className="text-2xl" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="w-[16rem] max-[320px]:w-full my-1">
            <Card.Header className="font-bold text-[13px] text-center">
              Group Joining Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">{groupJoining.length || 0}</span>
                <span>
                  {groupJoining.length > 0 ? (
                    <ArrowUpWideNarrow className="text-2xl" />
                  ) : (
                    <ArrowDownWideNarrow className="text-2xl" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="w-[16rem] max-[320px]:w-full my-1">
            <Card.Header className="font-bold text-[13px] text-center">
              Generic Project Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">
                  {genericProjectRequests.length || 0}
                </span>
                <span>
                  {genericProjectRequests.length > 0 ? (
                    <ArrowUpWideNarrow className="text-2xl" />
                  ) : (
                    <ArrowDownWideNarrow className="text-2xl" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
