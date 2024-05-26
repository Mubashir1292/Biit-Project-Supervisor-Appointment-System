import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import biitSas from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
function Dashboard() {
  const [user, setUser] = useState();
  const [supervisingRequests, setSupervisorRequests] = useState([{}]);
  const [groupJoinging, setGroupJoining] = useState([{}]);
  const [genericProjectRequests, setGenericProjectRequests] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      setUser(user);
    } else navigate("/");
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-center ">
          {/* setting the image of the Biit Logo */}
          <img src={biitSas} alt="Biit Logo" />
        </div>
        <div className="flex justify-around mt-3">
          <Card className="w-[16rem]">
            <Card.Header className="font-bold text-[13px] text-center">
              Supervising Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">{supervisingRequests.length}</span>
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
          <Card className="w-[16rem]">
            <Card.Header className="font-bold text-[13px] text-center">
              Group Joining Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">{groupJoinging.length}</span>
                <span>
                  {groupJoinging.length > 0 ? (
                    <ArrowUpWideNarrow className="text-2xl" />
                  ) : (
                    <ArrowDownWideNarrow className="text-2xl" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="w-[16rem]">
            <Card.Header className="font-bold text-[13px] text-center">
              Generic Project Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">
                  {genericProjectRequests.length}
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
