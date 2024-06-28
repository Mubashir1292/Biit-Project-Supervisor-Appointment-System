import React, { useEffect, useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

function ReceivedGroupRequest() {
  const userString = localStorage.getItem("user");
  const userFounded = userString ? JSON.parse(userString) : null;
  const [groupDetail, setGroupDetail] = useState([]);

  const handleSubmit = async (group, option) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/RespondingBackToRequest?msgId=${
          group.message_id
        }&response=${option === 1 ? "Accept" : "Reject"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.text();
      if (result.includes("Status Updated")) {
        alert(result);
        // Remove the request from groupDetail state
        setGroupDetail((prevGroupDetail) =>
          prevGroupDetail.filter((item) => item.message_id !== group.message_id)
        );
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllGroupRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/ReceiverGettingAllRequests?id=${userFounded.uid}`
      );
      const result = await response.json();
      if (typeof result === "object" || Array.isArray(result)) {
        setGroupDetail(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllGroupRequests();
  }, []);
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center min-[320px]:w-[320px]">
        <div className="flex flex-col self-center">
          <img src={BiitSAS} alt="BiitSAS" className="w-full" />
          <h3>Received Group Request</h3>
        </div>
        {groupDetail && groupDetail.length > 0 ? (
          groupDetail?.map((group, index) => (
            <Card className="min-[320px]:w-[320px]" key={index}>
              <div className="w-full flex justify-around items-center">
                <div className=" mt-2">
                  <Card.Title className="flex justify-center items-center space-x-2">
                    <strong className="text-xs">Student:</strong>
                    <span className="text-xs">{group?.sender?.username}</span>
                    <span className="text-xs ml-2">{group?.sender?.uid}</span>
                  </Card.Title>
                  <Card.Title className="flex justify-center items-center space-x-2">
                    <strong className="text-xs">Message:</strong>
                    <span className="text-xs">{group?.message_body}</span>
                  </Card.Title>
                  <Card.Title className="flex justify-center items-center space-x-2">
                    <strong className="text-xs">Suggested Technology:</strong>
                    <span className="text-xs">{group?.name}</span>
                  </Card.Title>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-3 mt-4 mb-2">
                <Button
                  variant="success"
                  onClick={() => {
                    handleSubmit(group, 1);
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleSubmit(group, 0);
                  }}
                >
                  Reject
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <span>no Request Founded</span>
        )}
      </div>
    </React.Fragment>
  );
}

export default ReceivedGroupRequest;
