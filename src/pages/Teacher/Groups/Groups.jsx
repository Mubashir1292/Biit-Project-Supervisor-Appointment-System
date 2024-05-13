import React, { useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import man from "../../../assets/extra/man2.jpg";
import man2 from "../../../assets/extra/man.png";
import { Search } from "lucide-react";

function Groups() {
  const [searchText, setSearchText] = useState("");
  const [groups, setGroups] = useState([
    {
      title: "Ai Health Engine",
      description: "Health Care of Patients",
      image: man,

      groupMembers: [
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
      ],
    },

    {
      title: "Ai Health Engine",
      description: "Health Care of Patients",
      image: man,

      groupMembers: [
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
      ],
    },

    {
      title: "Ai Health Engine",
      description: "Health Care of Patients",
      image: man,

      groupMembers: [
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
        {
          image: man2,
          id: "2020-Arid-3675",
          name: "Mubashir Liaqat",
        },
      ],
    },
  ]);
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <img src={BiitSAS} alt="BiitSAS" className="flex self-center" />
        <div className="flex flex-col bg-gray-200">
          <div className="flex justify-around">
            <h2 className="text-2xl">All Groups</h2>
            <div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline-success" id="button-addon2">
                  <Search className="w-[14px]" />
                </Button>
              </InputGroup>
            </div>
          </div>
          <div className="container">
            <div className=" grid grid-cols-2 pb-5">
              {groups.map((item, index) => (
                <div
                  className="grid col-lg-11 grid-cols-3 bg-gray-50 drop-shadow-md rounded-md mt-2"
                  key={index}
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={item.image}
                      alt={`${item.title}`}
                      className="cursor-pointer w-6/12 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col border-r border-gray-300 border-l justify-center items-center cursor-pointer">
                    <h6>{item.title}</h6>
                    <span className="text-sm">{item.description}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h6>Students</h6>
                    <div className="flex">
                      {item.groupMembers.map((member) => (
                        <img
                          key={member.id}
                          src={member.image}
                          alt={`${member.name}`}
                          className="cursor-pointer border-2 hover:border-gray-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Groups;
