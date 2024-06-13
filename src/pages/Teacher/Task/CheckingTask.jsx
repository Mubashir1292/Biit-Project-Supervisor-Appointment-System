import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import Table from "react-bootstrap/Table";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, Form, InputGroup } from "react-bootstrap";

function CheckingTask() {
  const [semester, setSemester] = useState(7);
  const [selectionGroup, setSelectionGroup] = useState();
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [allgroups, setAllGroups] = useState([]);
  const [allMeetings, setAllMeetings] = useState([]);
  const [allGroupMembers, setAllGroupsMembers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [comments, setComments] = useState({});
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  //! fetching all groups
  const getAllGroupsOnSemester = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/Psas_Supervisor_Expert/getAllGroups?semester=${semester}&teacher_id=${user.uid}`
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

  const FetchMeetingsOnGroupTitle = async (option) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchMeetingsOnGroupTitle?teacher_id=${
          user.uid
        }&group_id=${option && option.label}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllMeetings(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FetchingGroupMembersDetails = async (option) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchingGroupMembersDetails?meeting_id=${option.label}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllGroupsMembers(result);
        // Initialize attendance and comments states
        const initialAttendance = {};
        const initialComments = {};
        result.forEach((member) => {
          initialAttendance[member.st_id] = 0;
          initialComments[member.st_id] = "";
        });
        setAttendance(initialAttendance);
        setComments(initialComments);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGroupsOnSemester();
  }, [semester]);

  const handleSelect = (option) => {
    setSelectionGroup(option);
    FetchMeetingsOnGroupTitle(option);
  };

  const handleMeetingSelect = (option) => {
    setSelectedMeeting(option);
    FetchingGroupMembersDetails(option);
  };

  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
    setSelectionGroup(null);
    setSelectedMeeting(null);
  };

  const handleAttendanceChange = (st_id) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [st_id]: prevAttendance[st_id] === 1 ? 0 : 1,
    }));
  };

  const handleCommentsChange = (st_id, comments) => {
    setComments((prevComments) => ({
      ...prevComments,
      [st_id]: comments,
    }));
  };

  const updateMeetingProgress = async (group, meeting, MeetingProgressList) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/updateMeetingProgress?group_id=${group}&meeting_id=${meeting}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ MeetingProgress: MeetingProgressList }),
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

  const handleSubmit = async () => {
    if (!selectionGroup) {
      alert("Select the group");
      return;
    }
    if (!selectedMeeting) {
      alert("Select the meeting");
      return;
    }

    const dataToSend = Object.keys(attendance).map((member) => ({
      regNo: member,
      attendance: attendance[member],
      comment: comments[member],
    }));

    console.log(selectionGroup);
    console.log(selectedMeeting);
    console.log(dataToSend);

    await updateMeetingProgress(
      selectionGroup.label,
      selectedMeeting.label,
      dataToSend
    );
  };

  const handleCancel = () => {
    setAttendance((prevAttendance) =>
      Object.keys(prevAttendance).reduce((acc, st_id) => {
        acc[st_id] = 0;
        return acc;
      }, {})
    );
    setComments((prevComments) =>
      Object.keys(prevComments).reduce((acc, st_id) => {
        acc[st_id] = "";
        return acc;
      }, {})
    );
  };

  return (
    <React.Fragment>
      <div className="flex flex-col max-[320px]:w-[320px]">
        <img
          src={BiitSAS}
          alt="Biit-SAS"
          className="max-[320px]:w-8/12 flex self-center"
        />
        <h3 className="text-center font-normal text-green-500">
          Update Meetings
        </h3>
        <div className="flex justify-center">
          <h6
            className={`cursor-pointer ${
              semester === 7
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            } px-16 py-2 max-[320px]:px-8 max-[320px]:py-2 max-[320px]:text-xs  transition-all border-b border-gray-400 rounded-sm`}
            onClick={() => handleSemesterChange(7)}
          >
            Fyp-01
          </h6>
          <h6
            className={`cursor-pointer ${
              semester === 8
                ? "bg-green-500 text-white font-bold"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
            } px-16 py-2 max-[320px]:px-8 max-[320px]:py-2 max-[320px]:text-xs border-b border-gray-400 transition-all rounded-sm`}
            onClick={() => handleSemesterChange(8)}
          >
            Fyp-02
          </h6>
        </div>
        <div className="flex justify-center max-[320px]:space-x-3 space-x-5 items-center">
          <span className="max-[320px]:text-xs text-sm">Select Group:</span>
          <Dropdown
            options={allgroups}
            value={selectionGroup}
            OnSelect={handleSelect}
            className="relative  max-[320px]:w-3/6 w-2/12 cursor-default max-[320px]:text-[10px] text-sm"
          />
        </div>
        <div className="border-2 border-green-500 mt-3 max-[320px]:w-full w-4/12 flex flex-col self-center p-2 rounded-md">
          <div className="flex justify-center items-center max-[320px]:space-x-0 space-x-5">
            <span className="max-[320px]:text-xs text-sm">Select Meeting:</span>
            <Dropdown
              options={allMeetings}
              value={selectedMeeting}
              OnSelect={handleMeetingSelect}
              className="relative max-[320px]:w-8/12 w-5/12 cursor-default"
            />
          </div>
          {!selectedMeeting ? (
            <div className="w-2/6 mt-3 mx-auto">
              <SkeletonTheme highlightColor="#05B05B">
                <Skeleton count={4} />
              </SkeletonTheme>
            </div>
          ) : (
            <>
              <Table bordered hover className="mt-2">
                <thead>
                  <tr>
                    <th className="text-xs font-semibold text-center">Name</th>
                    <th className="text-xs font-semibold text-center">
                      Attendance
                    </th>
                    <th className="text-xs text-center font-semibold">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allGroupMembers &&
                    allGroupMembers.map((member, index) => (
                      <tr key={index}>
                        <td className="text-[10px]">{member?.st_id}</td>
                        <td className="text-center">
                          <div className="w-full flex justify-center items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={attendance[member?.st_id] === 1}
                              onChange={() =>
                                handleAttendanceChange(member?.st_id)
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <InputGroup size="sm">
                            <Form.Control
                              aria-label="Small"
                              aria-describedby="inputGroup-sizing-sm"
                              placeholder="Comments..."
                              className="text-[10px]"
                              value={comments[member.st_id]}
                              onChange={(e) =>
                                handleCommentsChange(
                                  member.st_id,
                                  e.target.value
                                )
                              }
                            />
                          </InputGroup>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </>
          )}
          <div className="flex justify-center items-center space-x-3">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckingTask;
