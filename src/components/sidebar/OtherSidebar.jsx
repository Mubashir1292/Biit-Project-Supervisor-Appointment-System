import React, { useEffect, useState } from "react";
import {
  CircleDotDashed,
  Group,
  GroupIcon,
  HelpCircle,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import sas from "../../assets/extra/sas.png";
import { NavLink } from "react-router-dom";
import { GoProject, GoProjectTemplate, GoTasklist } from "react-icons/go";
import { GiExplosiveMeeting, GiGroupedDrops, GiTeacher } from "react-icons/gi";
import { VscRequestChanges } from "react-icons/vsc";
import { AiFillSchedule } from "react-icons/ai";
import { SiGotomeeting } from "react-icons/si";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { FaDiagramProject } from "react-icons/fa6";

function OtherSidebar({ expanded, setExpanded }) {
  const [user, setUser] = useState({});
  const [allLinks, setAllLinks] = useState([]);
  const userString = localStorage.getItem("user");
  const isUser = userString ? JSON.parse(userString) : null;
  useEffect(() => {
    console.log("otherSideBar");
    console.log(isUser);
    if (isUser !== null) {
      setUser(isUser);
      if (isUser.role === "Technical Expert") {
        setAllLinks(TechnicalExpertlinks);
      } else if (isUser.role === "student") {
        setAllLinks(studentLinks);
      } else if (isUser.role === "teacher") {
        //* set the links of teachers
      } else if (isUser.role === "Project Commetiee") {
        setAllLinks(projectCommetieeLinks);
      }
    }
  }, []);
  const TechnicalExpertlinks = [
    {
      label: "Dashboard",
      path: "/TechnicalExpert/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Help Request",
      path: "/TechnicalExpert/AnotherHelpRequest",
      icon: <VscRequestChanges size={20} />,
    },
    {
      label: "Schedule",
      path: "/TechnicalExpert/Schedule",
      icon: <AiFillSchedule size={20} />,
    },
    {
      label: "Meetings",
      path: "/TechnicalExpert/Meetings",
      icon: <SiGotomeeting size={20} />,
    },

    // {
    //   label: "My Group",
    //   path: "/student/creatingGroup",
    //   icon: <Group size={20} />,
    // },
    // {
    //   label: "Project Request",
    //   path: "/student/ProjectRequesting",
    //   icon: <GoProject size={20} />,
    // },
    // {
    //   label: "Help Request",
    //   path: "/student/HelpRequest",
    //   icon: <HelpCircle size={20} />,
    // },
    // {
    //   label: "Join Group",
    //   path: "/student/JoiningAGroup",
    //   icon: <UsersRound size={20} />,
    // },
    // {
    //   label: "Task",
    //   path: "/student/TaskList",
    //   icon: <GoTasklist size={20} />,
    // },
    // {
    //   label: "Progress",
    //   path: "/student/progress",
    //   icon: <CircleDotDashed size={20} />,
    // },
  ];
  const studentLinks = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "group",
      path: "/student/creatingGroup",
      icon: <Group size={20} />,
    },
    // {
    //   label: "Progress",
    //   path: "/student/progress",
    //   icon: <CircleDotDashed size={20} />,
    // },
    {
      label: "Project Request",
      path: "/student/ProjectRequesting",
      icon: <GoProject size={20} />,
    },
    {
      label: "Help Request",
      path: "/student/HelpRequest",
      icon: <HelpCircle size={20} />,
    },
    {
      label: "Join Group",
      path: "/student/JoiningAGroup",
      icon: <UsersRound size={20} />,
    },
    // {
    //   label: "Task",
    //   path: "/student/TaskList",
    //   icon: <GoTasklist size={20} />,
    // },
  ];
  const projectCommetieeLinks = [
    {
      label: "Dashboard",
      path: "/projectCommetiee/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Supervising Requests",
      path: "/projectCommetiee/supervisorRequest",
      icon: <FaUserTie size={20} />,
    },
    {
      label: "Students Requests",
      path: "/projectCommetiee/JoinGroup",
      icon: <FaUserGraduate size={20} />,
    },
    {
      label: "Project Requests",
      path: "/projectCommetiee/groupRequests",
      icon: <FaDiagramProject size={20} />,
    },
  ];

  const RenderedLinks = allLinks.map((link, index) => {
    return (
      <NavLink
        key={index}
        to={link.path}
        className={({ isActive }) =>
          `bg-[#37373d] text-sm  hover:bg-green-400 w-full p-2 mt-2 hover:font-bold rounded-md border text-white hover:text-green-600 hover:shadow-md no-underline ${
            !expanded ? "w-full transition-all" : "transition-all"
          } ${
            isActive
              ? "font-bold border-l-4 bg-green-800 border-green-500 transition-all hover:bg-green-900 pl-2 shadow-lg text-md no-underline"
              : ""
          }`
        }
      >
        <div className="flex flex-row space-x-4">
          {expanded ? (
            <span className="mt-1">{link.icon}</span>
          ) : (
            <span className="mt-1">{link.icon}</span>
          )}
          {expanded ? <span className="no-underline">{link.label}</span> : ""}
        </div>
      </NavLink>
    );
  });
  return (
    <div
      className={`sticky h-screen overflow-y-none items-center bg-[#37373d]  shadow-sm ${
        expanded ? "w-52" : "w-20"
      }`}
    >
      <div className="p-1 pb-2 flex justify-between items-center">
        <img
          src={sas}
          alt="logo"
          className={`overflow-hidden transition-all cursor-pointer bg-green-700 m-3 rounded-xl ${
            expanded ? "w-32" : "w-0"
          }`}
        />
      </div>
      <div
        className={`w-full flex flex-col p-4 ${
          expanded ? "w-full" : "w-[86px]"
        }`}
      >
        {RenderedLinks}
      </div>
    </div>
  );
}

export default OtherSidebar;
