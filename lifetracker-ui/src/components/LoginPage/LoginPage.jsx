import React, { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { FaLock, FaEnvelope } from "react-icons/fa";
import codepath from "../../assets/codepath.svg";
import "./Login.css";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Login = ({ setAppState }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await sleep(2000);

    try {
      const { data, error, message } = await apiClient.login(form);
      if (error) {
        setErrors((e) => ({ ...e, form: String(message) }));
        setIsLoading(false);
        return;
      }

      if (data) {
        setAppState((s) => ({ ...s, user: data.user, isAuthenticated: true }));
        localStorage.setItem("lifetracker_token", data.token);
        navigate("/activity");
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-heading">
          <img src={codepath} alt="logo" className="login-logo" />
          <h2>Welcome</h2>
        </div>
        <form onSubmit={handleOnSubmit} className="login-form">
          <div className="form-control">
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope className="input-icon-inner" />
              </span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleOnChange}
                className={`input-field ${
                  errors.email ? "input-field-error" : ""
                }`}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-control">
            <div className="input-group">
              <span className="input-icon">
                <FaLock className="input-icon-inner" />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleOnChange}
                className={`input-field ${
                  errors.password ? "input-field-error" : ""
                }`}
              />
              <span className="input-right-icon" onClick={handleShowClick}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className={`login-button ${
              isLoading ? "login-button-loading" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <div className="signup-link">
        New to us?{" "}
        <ReactRouterLink to="/register" className="signup-link-text">
          Sign Up
        </ReactRouterLink>
      </div>
    </div>
  );
};

export default Login;
