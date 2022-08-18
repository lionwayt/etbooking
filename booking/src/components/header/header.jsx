import React from "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <span className="logo">Et-Booking</span>
        <div className="headerItem">
          <button className="Button">Register</button>
          <button className="Button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
