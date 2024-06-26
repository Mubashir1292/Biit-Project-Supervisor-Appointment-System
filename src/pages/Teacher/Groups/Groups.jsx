import React, { useEffect, useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import man2 from "../../../assets/extra/man.png";
import { Search } from "lucide-react";
import GroupDetailsModal from "../../../components/Modals/BootstrapModal/SimpleModal";
import ProjectModal from "../../../components/Modals/projectModal/ProjectModal";
import ProfileModal from "../../../components/Modals/BootstrapModal/ProfileModal";

function Groups() {
  const userString = localStorage.getItem("user");
  const userFounded = userString ? JSON.parse(userString) : null;
  const [isUser, setIsUser] = useState(userFounded);
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

  //! Fetching all groups
  const FetchAllGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialPSAS/api/PSAS_Supervisor_Expert/AllocatedGroupsToTeacher?teacher_id=${isUser.uid}`
      );
      const data = await response.json();
      if (data) {
        console.log(data);
        setGroups(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const groupsAll = [
    //   {
    //     title: "AI Health Engine",
    //     description: "Health Care of Patients",
    //     CGPA: 2.3,
    //     groupMembers: [
    //       {
    //         image: man2,
    //         id: "2020-Arid-3675",
    //         name: "Mubashir Liaqat",
    //       },
    //       {
    //         image: man2,
    //         id: "2020-Arid-3675",
    //         name: "Mubashir Liaqat",
    //       },
    //       {
    //         image: man2,
    //         id: "2020-Arid-3675",
    //         name: "Mubashir Liaqat",
    //       },
    //       {
    //         image: man2,
    //         id: "2020-Arid-3675",
    //         name: "Mubashir Liaqat",
    //       },
    //       {
    //         image: man2,
    //         id: "2020-Arid-3675",
    //         name: "Mubashir Liaqat",
    //       },
    //     ],
    //   },
    // ];
    FetchAllGroups();
  }, []);

  const handleToggle = () => {
    setModalShow(!modalShow);
  };

  const getPlaceholder = (title) => {
    return title ? title.charAt(0).toUpperCase() : "N/A";
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
                    {/* Placeholder for group image */}
                    <div
                      className="flex justify-center items-center w-2/12 h-12 bg-gray-200 rounded-full m-2"
                      onClick={handleToggle}
                    >
                      <span className="text-2xl font-bold">
                        {getPlaceholder(item.group.project.projectTite)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col border-r border-gray-300 border-l justify-center items-center cursor-pointer">
                    <h6>{item.group.project.projectTite}</h6>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h6>Students</h6>
                    <div className="grid grid-cols-3">
                      {item.groupMembers.map((member, index) =>
                        member.path ? (
                          <img
                            key={index}
                            src={`http://localhost/OfficialPSAS/Content/Images/${member.path}`}
                            alt={`${member.name}`}
                            className="cursor-pointer border w-12 h-10 hover:border-gray-500 rounded-full"
                            onClick={() => {
                              setSelectedProfile(member);
                              setStudentModal(!studentModal);
                            }}
                          />
                        ) : (
                          <div
                            key={index}
                            className="flex justify-center items-center w-full h-8 bg-gray-200 rounded-full m-3"
                            onClick={handleToggle}
                          >
                            <span className="text-sm font-semibold">
                              {getPlaceholder(member.name)}
                            </span>
                          </div>
                        )
                      )}
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
