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
  const [expanded, setExpanded] = useState(true); // Initialize expanded state

  // Function to toggle the expanded state
  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex flex-row min-w-full">
      <div
        className={
          expanded
            ? "xl:w-0/12 lg:w-0/12 md:w-0/12 sm:w-0/12 max-[420px]:hidden"
            : "w-0/12"
        }
      >
        <OtherSidebar expanded={expanded} />
      </div>
      <div
        className={
          expanded
            ? "flex flex-col w-11/12 max-[420px]:w-full"
            : "flex flex-col w-full"
        }
      >
        <Header expanded={expanded} setExpanded={toggleExpanded} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
