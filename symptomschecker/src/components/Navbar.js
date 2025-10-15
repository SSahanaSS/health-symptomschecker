import React from "react";
import "./csscss/navbar.css";

function Navbar({ onNavigate }) {
  return (
    <div className="navbar">
      <div className="navbar-left" onClick={() => onNavigate("home")}>
        Healthcare Symptom Checker
      </div>
      <div className="navbar-right" onClick={() => onNavigate("history")}>
        History
      </div>
    </div>
  );
}

export default Navbar;
