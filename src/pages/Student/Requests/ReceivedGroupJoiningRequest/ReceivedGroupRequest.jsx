import React, { useEffect, useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import { Button, Accordion } from "react-bootstrap";

function ReceivedGroupRequest() {
  const userString = localStorage.getItem("user");
  const userFounded = userString ? JSON.parse(userString) : null;
  const [groupDetail, setGroupDetail] = useState([]);
  const [tableHeadings, setTableHeading] = useState([
    "Image",
    "Reg#",
    "Name",
    "Technology",
    "CGPA",
    "Semester",
    "Section",
    "Grade",
  ]);

  const handleSubmit = async (group) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/RespondingBackToRequest?msgId=${group.message_id}&response=Accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result) {
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
      if (result) {
        if (result === "Nothing in Messages") {
          alert("Nothing in Messages");
        } else {
          setGroupDetail(result);
        }
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
        <Accordion defaultActiveKey="0">
          {groupDetail && groupDetail.length > 0 ? (
            groupDetail.map((group, index) => (
              <Accordion.Item
                eventKey={String(index)}
                key={index}
                className="min-[320px]:w-[320px]"
              >
                <Accordion.Header>{group.sender.username}</Accordion.Header>
                <Accordion.Body>
                  <Card>
                    <div className="w-full flex justify-around items-center">
                      <div className="w-[18rem] bg-gray-200 mt-2">
                        <Card.Title className="flex justify-center items-center space-x-2">
                          <strong className="text-xs">Student:</strong>
                          <span className="text-xs">
                            {group.sender.username}
                          </span>
                          <span className="text-xs ml-2">
                            {group.sender.uid}
                          </span>
                        </Card.Title>
                        <Card.Title className="flex justify-center items-center space-x-2">
                          <strong className="text-xs">Message:</strong>
                          <span className="text-xs">{group.message_body}</span>
                        </Card.Title>
                        <Card.Title className="flex justify-center items-center space-x-2">
                          <strong className="text-xs">
                            Suggested Technology:
                          </strong>
                          <span className="text-xs">{group.name}</span>
                        </Card.Title>
                      </div>
                    </div>
                    <div className="flex justify-center items-center space-x-3 mt-4 mb-2">
                      <Button
                        variant="success"
                        onClick={() => {
                          handleSubmit(group);
                        }}
                      >
                        Accept
                      </Button>
                      <Button variant="secondary">Reject</Button>
                    </div>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            ))
          ) : (
            <span>no Request Founded</span>
          )}
        </Accordion>
      </div>
    </React.Fragment>
  );
}

export default ReceivedGroupRequest;
