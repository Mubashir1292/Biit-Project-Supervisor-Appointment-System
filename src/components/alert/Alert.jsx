import React, { useState, useEffect } from "react";
import { SearchCheck, SearchX } from "lucide-react";
const Alert = ({ type, message }) => {
  const alertClasses = {
    success: "bg-green-100 border-green-300 text-green-700",
    failure: "bg-red-100 border-red-400 text-red-700",
  };
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {visible && (
        <div
          className={`border rounded-md w-3/12 p-2 flex flex-row justify-around items-center space-x-3  font-bold ${alertClasses[type]}`}
        >
          {type ? <SearchCheck className="" /> : <SearchX />}
          {message}
        </div>
      )}
    </>
  );
};

export default Alert;
