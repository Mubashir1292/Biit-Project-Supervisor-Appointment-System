import React, { useEffect, useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import man from "../../../assets/extra/man2.jpg";
import man2 from "../../../assets/extra/man.png";
import { Search } from "lucide-react";
import GroupDetailsModal from "../../../components/Modals/BootstrapModal/SimpleModal";
import ProjectModal from "../../../components/Modals/projectModal/ProjectModal";
import ProfileModal from "../../../components/Modals/BootstrapModal/ProfileModal";
function Groups() {
  const [modalShow, setModalShow] = useState(false);
  const [studentModal, setStudentModal] = useState(false);
  const [projectmodalShow, setProjectModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedProfile, setSelectedProfile] = useState();
  const [searchText, setSearchText] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const handleSearch = (search) => {
    if (search) {
      const findingGroup = groups.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setGroups(findingGroup);
    } else {
      // alert("Search must not  be null");
      setGroups(groups);
    }
  };
  useEffect(() => {
    const groupsAll = [
      {
        title: "AI Health Engine",
        description: "Health Care of Patients",
        image: man,
        CGPA: 2.3,
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
        title: "BIIT Career Counsling",
        description: "Health Care of Patients",
        image: man,
        CGPA: 3.3,
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
        title: "BIIT Project Supervisor Appointment System",
        description: "Health Care of Patients",
        image: man,
        CGPA: 3.6,
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
    ];
    setGroups(groupsAll);
  }, []);
  const handleToggle = () => {
    setModalShow(!modalShow);
  };
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <img src={BiitSAS} alt="BiitSAS" className="flex self-center" />
        <h2 className="text-xl text-center text-green-500">All Groups</h2>
        <div className="flex flex-col bg-gray-200">
          <div className="flex justify-around">
            <div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e.target.value);
                    } else if (e.key === "Escape") {
                      e.target.blur();
                    }
                  }}
                />
                <Button
                  variant="outline-success"
                  id="button-addon2"
                  onClick={() => handleSearch(searchText)}
                >
                  <Search className="w-[14px]" />
                </Button>
              </InputGroup>
            </div>
          </div>
          <div className="container">
            <div className=" grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 pb-5">
              {groups.map((item, index) => (
                <div
                  className="grid col-lg-11 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 bg-gray-50 drop-shadow-md rounded-md mt-2"
                  key={index}
                >
                  <div
                    className="flex justify-center items-center"
                    onClick={() => setSelectedGroup(item)}
                  >
                    <img
                      src={item.image}
                      alt={`${item.title}`}
                      className="cursor-pointer w-9/12 rounded m-2"
                      onClick={handleToggle}
                    />
                  </div>
                  <div className="flex flex-col border-r border-gray-300 border-l justify-center items-center cursor-pointer">
                    <h6>{item.title}</h6>
                    <span className="text-sm">{item.description}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h6>Students</h6>
                    <div className="grid grid-cols-3">
                      {item.groupMembers.map((member, index) => (
                        <img
                          key={index}
                          src={member.image}
                          alt={`${member.name}`}
                          className="cursor-pointer border-2 hover:border-gray-500 rounded-full"
                          onClick={() => {
                            setSelectedProfile(member);
                            setStudentModal(!studentModal);
                          }}
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
      {modalShow ? (
        <>
          <GroupDetailsModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            group={selectedGroup}
          />
        </>
      ) : (
        <></>
      )}

      {projectmodalShow ? (
        <>
          <ProjectModal
            show={projectmodalShow}
            onHide={() => setProjectModalShow(false)}
            group={selectedProject}
          />
        </>
      ) : (
        <></>
      )}
      {studentModal ? (
        <>
          <ProfileModal
            show={studentModal}
            onHide={() => setStudentModal(false)}
            student={selectedProfile}
          />
        </>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default Groups;
