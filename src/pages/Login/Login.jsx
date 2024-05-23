import React, { useState, useEffect } from "react";
import BiitLogo from "../../assets/login/biitLogo.png";
import Login from "../../assets/login/login.png";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  document.title = "BIIT Project Supervisor Appointment System";
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(id.length === 0 || password.length === 0);
  }, [id, password]);

  const handleLogin = async () => {
    if (id.length === 0 || password.length === 0) {
      setError(true);
      setLoading(false);
    } else {
      setError(false);
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.1.6/OfficialPSAS/api/psas/Login?id=${id}&password=${password}`
        );
        const res = await response.json();
        if (res != null) {
          localStorage.setItem("user", JSON.stringify(res));
          if (res.role === "student") {
            navigate("/student/dashboard", { state: res });
          } else if (res.role === "teacher") {
            navigate("/teacher/dashboard", { state: res });
          } else if (res.role === "Technical Expert") {
            navigate("/TechnicalExpert/dashboard", { state: res });
          } else if (res.role === "Project Commetiee") {
            navigate("/projectCommetiee/dashboard", { state: res });
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center shadow items-center h-screen">
      <div className="bg-green-500 w-3/12 h-[500px]">
        <div className="w-full">
          <img
            src={BiitLogo}
            alt="biitLogo"
            className="w-10/12 mt-4 mx-auto "
          />
        </div>
        <img src={Login} alt="Login" className="w-8/12 mt-4 mx-auto " />
        <h4 className="text-center mt-3 text-[#fff]">Login to Account</h4>
      </div>
      <div className="w-3/12 p-2 shadow-lg h-[500px]">
        <form
          className="h-[100%]  px-2 pt-6 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4 mt-3 flex flex-col justify-center pt-10 box-border ">
            <h3 className="text-center text-green-500">Welcome Back</h3>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter ID"
              className="mb-3  mt-3 text-gray-500"
            >
              <Form.Control
                type="text"
                placeholder="01"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </FloatingLabel>
            <span>
              {error ? (
                <span className="text-red-500">Please Fill Out This Field</span>
              ) : (
                ""
              )}
            </span>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter Password"
              className="mb-3 text-gray-500"
            >
              <Form.Control
                type="password"
                placeholder="...."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <span>
              {error ? (
                <span className="text-red-500">Please Fill Out This Field</span>
              ) : (
                ""
              )}
            </span>
            <button
              className="bg-[#05B058] flex self-center justify-center items-center  hover:bg-gray-200 text-[#fff] hover:text-[#05B058] hover:shadow-2xl border font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100%] transition-all ease-in-out cursor-pointer"
              type="button"
              disabled={isButtonDisabled}
              onClick={() => {
                handleLogin();
              }}
            >
              {loading ? (
                <Spinner animation="border" className="text-center" />
              ) : (
                <span className="text-center">Login</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
