import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import OtherSidebar from "./components/sidebar/OtherSidebar";

function Layout() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const currentUser = localStorage.getItem("isUser");
    setUser(currentUser);
    // now checking the user and sending the different routes to it...
  }, []);
  const [expanded, setExpanded] = useState(false); // Initialize expanded state

  // Function to toggle the expanded state
  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header expanded={expanded} setExpanded={toggleExpanded} />
      <div className="flex">
        <div
          className={`fixed inset-y-0 left-0 transform ${
            expanded ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out w-64 bg-[#37373d] z-50`}
        >
          <OtherSidebar expanded={expanded} setExpanded={toggleExpanded} />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      {expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleExpanded}
        ></div>
      )}
    </div>
  );
}

export default Layout;
