import React, { useState } from "react";
import biitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
function ProjectRequesting() {
  const options = [
    { label: "React Native", value: "React-Native" },
    { label: "Android", value: "Android" },
  ];
  const [selection, setSelection] = useState(null);

  const handleSelect = (option) => {
    setSelection(option);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex justify-center items-center pt-2">
          <img src={biitSAS} alt="BiitPSAS" className="w-3/12" />
        </div>

        <div className="w-full flex flex-col justify-center items-center pt-2">
          <h1 className="text-green-600 font-bold -mt-2 text-2xl cursor-default hover:text-green-500">
            Project Selection and Requesting
          </h1>
          <p className="font-normal text-lg ">
            Your Group CGPA :
            <span className="font-bold ml-3 border-b border-b-black">2.74</span>
          </p>
          <div className="flex flex-row w-full h-full justify-center  space-x-3 items-center">
            <label className="text-2xl">Select Project Domain :</label>
            <Dropdown
              label="Project Domain"
              options={options}
              value={selection}
              OnSelect={handleSelect}
              className="relative w-2/12 text-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectRequesting;
