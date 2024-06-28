import React, { useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";

function AddStudentGrades() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [allGroups, setAllGroups] = useState([]);
  const [semester, setSemester] = useState(7);
  const [selectionGroup, setSelectionGroup] = useState();
  const [allGroupMembers, setAllGroupsMembers] = useState([]);

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
  const handleSelect = (option) => {
    setSelectionGroup(option);
  };

  return (
    <React.Fragment>
      <div className="flex justify-center items-center min-[320px]:w-[320px]">
        <div className="flex justify-center max-[320px]:space-x-3 space-x-5 items-center">
          <span className="max-[320px]:text-xs text-sm">Select Group:</span>
          <Dropdown
            options={allGroups}
            value={selectionGroup}
            OnSelect={handleSelect}
            className="relative  max-[320px]:w-3/6 w-2/12 cursor-default max-[320px]:text-[10px] text-sm"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddStudentGrades;
