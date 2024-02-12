import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const btnstyle = {
    color: "#ffffff",
    backgroundColor: "#5435f1",
    borderRadius: "8px",
  };
  return (
    <>
      <nav className="navbar">
        <h1>
          <Link to="/">Dojo Blog</Link>
        </h1>
        <div className="links">
          <Link to="/">{props.home}</Link>
          {/* <Link to="/create" style={btnstyle}>
            {props.blog}
          </Link> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
