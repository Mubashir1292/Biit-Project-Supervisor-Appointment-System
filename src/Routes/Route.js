import Search from "../pages/Search/Search";
import StudentDashboard from "../pages/Student/Dashboard/StudentDashboard";
import MainScreen from "../pages/Student/GroupCreating/MainScreen";
import RequestToStudent from "../pages/Student/GroupCreating/RequestingGroupMember.jsx/RequestToStudent";
import MyGroup from "../pages/Student/MyGroup/MyGroup";
import MultipleNotification from "../pages/Student/Notification/MultipleNotification";
import Notification from "../pages/Student/Notification/Notification";
import Progress from "../pages/Student/Progress/Progress";
import ConfirmRequest from "../pages/Student/ProjectSelectionAndRequesting/ConfirmRequest";
import ProjectRequesting from "../pages/Student/ProjectSelectionAndRequesting/ProjectRequesting";
import HelpRequest from "../pages/Student/Requests/HelpRequest/HelpRequest";
import JoingingAGroupRequest from "../pages/Student/Requests/JoiningGroupRequest.jsx/JoingingAGroupRequest";
import TaskList from "../pages/Student/Tasks/TaskList";
import ExpertDashboard from "../pages/TechnicalExpert/Dashboard/ExpertDashboard";
import Meetings from "../pages/TechnicalExpert/Meetings/Meetings";
import AllNotifications from "../pages/TechnicalExpert/Notifications/AllNotifications";
import AnotherHelpRequest from "../pages/TechnicalExpert/Requests/AnotherHelpRequest";
import WeeklyScheduleUpdater from "../pages/TechnicalExpert/Schedule/ScheduleManagement";
import Dashboard from "../pages/Project_Commetiee/Dashboard/Dashboard";
import SupervisorRequests from "../pages/Project_Commetiee/Supervisor-Requests/SupervisorRequests";
import JoinToGroup from "../pages/Project_Commetiee/JoinToGroup/JoinToGroup";
import GroupRequests from "../pages/Project_Commetiee/GroupRequests/GroupRequests";
import TeacherDashboard from "../pages/Teacher/Dashboard/TeacherDashboard";
import Groups from "../pages/Teacher/Groups/Groups";
import TeacherMeetings from "../pages/Teacher/Meetings/TeacherMeetings";
import teacherGroupProgress from "../pages/Teacher/Progress/teacherGroupProgress";
import Schedule from "../pages/Teacher/Schedule/Schedule";
import Requests from "../pages/Teacher/Requests/Requests";
import SingleNotification from "../pages/Teacher/SingleNotifications/SingleNotification";
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
  { path: "/student/ConfirmRequest", element: <ConfirmRequest /> },
  { path: "/student/HelpRequest", element: <HelpRequest /> },
  { path: "/student/JoiningAGroup", element: <JoingingAGroupRequest /> },
  { path: "/student/TaskList", element: <TaskList /> },
  { path: "/search", element: <Search /> },
];
export const technicalExpertRoutes = [
  { path: "/TechnicalExpert/dashboard", element: <ExpertDashboard /> },
  { path: "/TechnicalExpert/Meetings", element: <Meetings /> },
  {
    path: "/TechnicalExpert/AnotherHelpRequest",
    element: <AnotherHelpRequest />,
  },
  { path: "/TechnicalExpert/Schedule", element: <WeeklyScheduleUpdater /> },
  { path: "/TechnicalExpert/Norification", element: <AllNotifications /> },
];
export const projectCommetiee = [
  { path: "/projectCommetiee/dashboard", element: <Dashboard /> },
  { path: "/projectCommetiee/groupRequests", element: <GroupRequests /> },
  { path: "/projectCommetiee/JoinGroup", element: <JoinToGroup /> },
  {
    path: "/projectCommetiee/supervisorRequest",
    element: <SupervisorRequests />,
  },
];
export const Teacher = [
  { path: "/teacher/dashboard", element: <TeacherDashboard /> },
  { path: "/teacher/groups", element: <Groups /> },
  { path: "/teacher/meetings", element: <TeacherMeetings /> },
  { path: "/teacher/groupProgress", element: <teacherGroupProgress /> },
  { path: "/teacher/requests", element: <Requests /> },
  { path: "/teacher/schedule", element: <Schedule /> },
  { path: "/teacher/notification", element: <SingleNotification /> },
];
