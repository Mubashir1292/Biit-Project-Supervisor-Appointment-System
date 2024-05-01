import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import biitSas from "../../../assets/extra/biitSAS.png";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import Dropdown from "../../../components/dropdown/Dropdown";
function Dashboard() {
  const [user, setUser] = useState();
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [selection, setSelection] = useState(null);
  const handleSelect = (option) => {
    setSelection(option);
  };
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      setUser(user);      
    } else navigate("/");
    handleGetOptions();
  }, []);
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
  //* working on to the project commetiee panel for four methods
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-center ">
          {/* setting the image of the Biit Logo */}
          <img src={biitSas} alt="Biit Logo" />
        </div>
        <Dropdown
          label="Today"
          options={options}
          value={selection}
          OnSelect={handleSelect}
          className="relative w-2/12"
        />
        <div className="flex justify-around mt-3">
          <Card className="w-[14rem] bg-white py-4 px-4 rounded border border-gray-300 shadow-lg">
            <CardBody>
              <CardTitle tag="h5" className="font-bold text-center">
                Students Requests
              </CardTitle>
              <CardSubtitle
                tag="h3"
                className="mb-3 text-muted text-xl text-center"
              >
                5
              </CardSubtitle>
              <CardText>Requests to join a group</CardText>
            </CardBody>
          </Card>
          <Card className="w-[14rem] bg-white py-4 px-4 rounded border border-gray-300 shadow-lg">
            <CardBody>
              <CardTitle tag="h5" className="font-bold text-center">
                Supervision Request
              </CardTitle>
              <CardSubtitle
                tag="h3"
                className="mb-3 text-muted text-xl text-center"
              >
                3
              </CardSubtitle>
              <CardText className="mb-3 text-md">
                Confirm a Supervisor to Supervise a group
              </CardText>
            </CardBody>
          </Card>
          <Card className="w-[14rem] bg-white py-4 px-4 rounded border border-gray-300 shadow-lg">
            <CardBody>
              <CardTitle tag="h5" className="font-bold text-center">
                Project Allocation
              </CardTitle>
              <CardSubtitle
                tag="h3"
                className="mb-3 text-muted text-xl text-center"
              >
                5
              </CardSubtitle>
              <CardText className="mb-3 text-mg">
                Requests for a project
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-around mt-5">
          <Card className="w-[14rem] h-40 bg-white py-4 px-4 rounded border border-gray-300 shadow-lg">
            <CardBody>
              <CardTitle tag="h5" className="font-bold">
                Project Allocation
              </CardTitle>
              <CardSubtitle
                tag="h3"
                className="mb-3 text-muted text-xl text-center"
              >
                5
              </CardSubtitle>
              <CardText className="mb-3 text-mg">
                Requests for a project
              </CardText>
            </CardBody>
          </Card>
          <Card className="w-[14rem] h-40 bg-white py-4 px-4 rounded border border-gray-300 shadow-lg">
            <CardBody>
              <CardTitle tag="h5" className="font-bold">
                Project Allocation
              </CardTitle>
              <CardSubtitle
                tag="h3"
                className="mb-3 text-muted text-xl text-center"
              >
                5
              </CardSubtitle>
              <CardText className="mb-3 text-mg">
                Requests for a project
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
