import React from "react";
import {
  NavLink,
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";
import codepath from "../../assets/codepath.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function DesktopNav({ appState, setAppState, ...props }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.setItem("lifetracker_token", null);
    setAppState({
      user: null,
      isAuthenticated: false,
      nutrition: [],
      sleep: [],
      exercise: [],
    });
    navigate("/");
  };

  return (
    <nav className="Navbar" {...props}>
      <div className="Navbar-container">
        <Link to="/" className="Navbar-logo">
          <img src={codepath} alt="logo" />
        </Link>
        <div className="Navbar-links">
          <NavLink to="/activity" className="Navbar-link">
            Activity
          </NavLink>
          <NavLink to="/exercise" className="Navbar-link">
            Exercise
          </NavLink>
          <NavLink to="/nutrition" className="Navbar-link">
            Nutrition
          </NavLink>
          <NavLink to="/sleep" className="Navbar-link">
            Sleep
          </NavLink>
        </div>
      </div>

      {appState?.user ? (
        <div className="Navbar-auth">
          <button className="Navbar-button" variant="outline" onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="Navbar-auth">
          <Link to="/login" as={ReactRouterLink} className="Navbar-button-link">
            <button className="Navbar-button" variant="outline">
              Sign In
            </button>
          </Link>
          <Link
            to="/register"
            as={ReactRouterLink}
            className="Navbar-button-link"
          >
            <button className="Navbar-button" variant="solid">
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
