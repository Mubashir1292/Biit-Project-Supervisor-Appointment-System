import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import Layout from "./Layout";
import { SearchContextProvider } from "./pages/Search/SearchContext/SearchContext";
import {
  Teacher,
  projectCommetiee,
  studentsRoutes,
  technicalExpertRoutes,
} from "./Routes/Route";
function App() {
  return (
    <SearchContextProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="" element={<Layout />}>
          {studentsRoutes.map((item, index) => {
            return (
              <Route key={index} path={item.path} element={item.element} />
            );
          })}
          {technicalExpertRoutes.map((item, index) => {
            return (
              <Route key={index} path={item.path} element={item.element} />
            );
          })}
          {projectCommetiee.map((item, index) => {
            return (
              <Route key={index} path={item.path} element={item.element} />
            );
          })}
          {Teacher.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      </Routes>
    </SearchContextProvider>
  );
}

export default App;
