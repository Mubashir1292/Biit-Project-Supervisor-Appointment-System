import React, { useState } from "react";
import BiitLogo from "../../assets/login/biitLogo.png";
import Login from "../../assets/login/login.png";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  document.title = "BIIT Supervisor Appointment System";
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.11/OfficialPSAS/api/psas/Login?id=${id}&password=${password}`
      );
      const res = await response.json();
      if (res != null) {
        if (res.role === "student") {
          localStorage.setItem("user", JSON.stringify(res));
          navigate("/student/dashboard", { state: res });
        } else if (res.role === "teacher") {
          navigate("/teacher/dashboard");
        } else if (res.role === "TechnicalExpert") {
          navigate("/technicalExpert/dashboard");
        } else if (res.role === "projectCommetiee") {
          navigate("/projectCommetiee/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center bg-[#D8E9EE] items-center h-screen">
      <div className="max-w-md  p-2 bg-[#3ae248]  shadow rounded-lg">
        <div className="w-full">
          <img
            src={BiitLogo}
            alt="biitLogo"
            className="w-[80%] mt-4 mx-auto "
          />
          <img src={Login} alt="Login" className="w-[50%] mt-4 mx-auto " />
        </div>
        <form
          className=" h-[100%] rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4 mt-3">
            <input
              className="shadow placeholder-gray-400 appearance-none border rounded-2xl text-black w-full text-lg py-3 px-3  leading-tight focus:outline-none focus:shadow-outline transition-all duration-300"
              id="username"
              type="text"
              placeholder="Username"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none placeholder-gray-400 border rounded-2xl text-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center ">
            <button
              className="bg-[#05B058] hover:bg-[#fff] text-[#fff] hover:text-[#05B058] hover:shadow-2xl border font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[60%]"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
