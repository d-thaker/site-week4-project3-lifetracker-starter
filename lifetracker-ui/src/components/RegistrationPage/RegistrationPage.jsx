import React, { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./Register.css";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Register = ({ setAppState }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await sleep(2000);

    try {
      const { data, error, message } = await apiClient.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        username: form.username,
      });
      if (error) {
        setErrors((e) => ({ ...e, form: message }));
        setIsLoading(false);
        return;
      }

      if (data) {
        setAppState((s) => ({ ...s, user: data, isAuthenticated: true }));
        localStorage.setItem("lifetracker_token", data.token);
        navigate("/activity");
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }));
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== e.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (e.target.name === "passwordConfirm") {
      if (form.password && form.password !== e.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <div className="register-icon"></div>

        <h1 className="register-title">Create an Account</h1>

        <div className="register-form">
          <form onSubmit={handleOnSubmit}>
            <div className="register-form-container">
              <div>
                <div className="register-input-icon">
                  <i className="icon-envelope"></i>
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleOnChange}
                  className={
                    errors.email
                      ? "register-input red-border"
                      : "register-input"
                  }
                />
              </div>
              <div>
                <div className="register-input-icon">
                  <i className="icon-user-alt"></i>
                </div>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleOnChange}
                  className={
                    errors.username
                      ? "register-input red-border"
                      : "register-input"
                  }
                />
              </div>

              <div className="register-input-container">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleOnChange}
                    className={
                      errors.firstName
                        ? "register-input red-border"
                        : "register-input"
                    }
                  />
                </div>
                <div>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleOnChange}
                    className={
                      errors.lastName
                        ? "register-input red-border"
                        : "register-input"
                    }
                  />
                </div>
              </div>

              <div>
                <div className="register-input-icon">
                  <i className="icon-lock"></i>
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleOnChange}
                  className={
                    errors.password
                      ? "register-input red-border"
                      : "register-input"
                  }
                />
                <button type="button" onClick={handleShowClick}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div>
                <div className="register-input-icon">
                  <i className="icon-lock"></i>
                </div>
                <input
                  name="passwordConfirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={form.passwordConfirm}
                  onChange={handleOnChange}
                  className={
                    errors.passwordConfirm
                      ? "register-input red-border"
                      : "register-input"
                  }
                />
                {errors.passwordConfirm && <div>Passwords don't match</div>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="register-button"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        Have an account?{" "}
        <ReactRouterLink to="/login" style={{ color: "teal" }}>
          Login
        </ReactRouterLink>
      </div>
    </div>
  );
};

export default Register;
