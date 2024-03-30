import Search from "../pages/Search/Search";
import StudentDashboard from "../pages/Student/Dashboard/StudentDashboard";
import GroupCreation from "../pages/Student/GroupCreating/GroupCreation";
import MainScreen from "../pages/Student/GroupCreating/MainScreen";
import RequestToStudent from "../pages/Student/GroupCreating/RequestingGroupMember.jsx/RequestToStudent";
import MyGroup from "../pages/Student/MyGroup/MyGroup";
import MultipleNotification from "../pages/Student/Notification/MultipleNotification";
import Notification from "../pages/Student/Notification/Notification";
import Progress from "../pages/Student/Progress/Progress";
import ProjectRequesting from "../pages/Student/ProjectSelectionAndRequesting/ProjectRequesting";
import ProjectSelection from "../pages/Student/ProjectSelectionAndRequesting/ProjectSelection";
import HelpRequest from "../pages/Student/Requests/HelpRequest/HelpRequest";
import JoingingAGroupRequest from "../pages/Student/Requests/JoiningGroupRequest.jsx/JoingingAGroupRequest";
import TaskList from "../pages/Student/Tasks/TaskList";
//? === inserting all Routes for all users
export const studentsRoutes = [
  { path: "/student/dashboard", element: <StudentDashboard /> },
  { path: "/student/creatingGroup", element: <MainScreen /> },
  { path: "/student/RequestGroupMember", element: <RequestToStudent /> },
  { path: "/student/MyGroup", element: <MyGroup /> },
  { path: "/student/MultipleNotifications", element: <MultipleNotification /> },
  { path: "/student/Notification", element: <Notification /> },
  { path: "/student/progress", element: <Progress /> },
  { path: "/student/ProjectRequesting", element: <ProjectRequesting /> },
  { path: "/student/ProjectSelection", element: <ProjectSelection /> },
  { path: "/student/HelpRequest", element: <HelpRequest /> },
  { path: "/student/JoiningAGroup", element: <JoingingAGroupRequest /> },
  { path: "/student/TaskList", element: <TaskList /> },
  { path: "/search", element: <Search /> },
  { path: "/search", element: <Search /> },
];
