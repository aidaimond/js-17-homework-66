import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-secondary bg-opacity-75">
      <div className="container-fluid">
        <NavLink to={'/'} className="navbar-brand">Calorie Tracker</NavLink>
        <div className="collapse navbar-collapse">
        </div>
      </div>
    </div>
  );
};

export default Header;