import React, { useEffect, useState } from "react";
import {
  CircleDotDashed,
  Group,
  HelpCircle,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import sas from "../../assets/extra/sas.png";
import { NavLink } from "react-router-dom";
import { GoProject, GoTasklist } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { VscRequestChanges } from "react-icons/vsc";
import { AiFillSchedule, AiTwotoneSchedule } from "react-icons/ai";
import { SiGotomeeting, SiProgress } from "react-icons/si";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { FaDiagramProject, FaUsersLine } from "react-icons/fa6";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { RiCalendarEventFill } from "react-icons/ri";
function OtherSidebar({ expanded, setExpanded }) {
  const [user, setUser] = useState({});
  const [allLinks, setAllLinks] = useState([]);
  const userString = localStorage.getItem("user");
  const isUser = userString ? JSON.parse(userString) : null;
  useEffect(() => {
    if (isUser !== null) {
      setUser(isUser);
      if (isUser.role === "Technical Expert") {
        setAllLinks(TechnicalExpertlinks);
      } else if (isUser.role === "student") {
        setAllLinks(studentLinks);
      } else if (isUser.role === "teacher") {
        setAllLinks(teacherLinks);
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
      label: "My Group",
      path: "/student/creatingGroup",
      icon: <Group size={20} />,
    },
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
    {
      label: "Tasks List",
      path: "/student/TaskList",
      icon: <GoTasklist size={20} />,
    },
    {
      label: "Progress",
      path: "/student/progress",
      icon: <CircleDotDashed size={20} />,
    },
    {
      label: "Group Requests",
      path: "/student/ReceivedGroupRequest",
      icon: <CircleDotDashed size={20} />,
    },
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

  const teacherLinks = [
    {
      label: "Dashboard",
      path: "/teacher/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Groups",
      path: "/teacher/groups",
      icon: <FaUsersLine size={20} />,
    },
    {
      label: "Group Request",
      path: "/teacher/request",
      icon: <HiClipboardDocumentList />,
    },
    {
      label: "Group Progress",
      path: "/teacher/allgroupProgress",
      icon: <GiProgression />,
    },
    {
      label: "Meetings",
      path: "/teacher/meetings",
      icon: <AiTwotoneSchedule />,
    },
    {
      label: "Schedule",
      path: "/teacher/schedule",
      icon: <RiCalendarEventFill />,
    },
    {
      label: "Assign New Task",
      path: "/teacher/AssigingTask",
      icon: <GrTask />,
    },
    {
      label: "Update Progress",
      path: "/teacher/CheckingTask",
      icon: <SiProgress />,
    },
  ];
  const RenderedLinks = allLinks.map((link, index) => {
    return (
      <NavLink
        key={index}
        to={link.path}
        onClick={(curr) => setExpanded(!curr)}
        className={({ isActive }) =>
          `bg-[#37373d] text-sm  hover:bg-green-700 w-full p-2 mt-2 hover:font-bold rounded-md border text-white hover:text-green-600 hover:shadow-md no-underline ${
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
      className={`sticky h-screen min-h-full overflow-y-none items-center bg-[#37373d]  shadow-sm ${
        expanded ? "xl:w-52 lg:w-52 md:w-32 sm:24" : "w-20"
      }`}
    >
      <div className="p-1 pb-2 flex justify-between items-center">
        <img
          src={sas}
          alt="logo"
          className={`overflow-hidden transition-all cursor-pointer bg-green-700 m-3 rounded-xl ${
            expanded ? "w-32 md:w-12 sm:w-12" : "w-0"
          }`}
        />
      </div>
      <div
        className={`w-full flex flex-col p-4 ${
          expanded ? "w-full " : "w-[86px]"
        }`}
      >
        {RenderedLinks}
      </div>
    </div>
  );
}

export default OtherSidebar;
