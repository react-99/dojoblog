import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="content">
        <h2>
          Sorry <span>404</span>
        </h2>
        <p>Page Not Found</p>
        <Link to="/" className="btn">
          Back to Homepage...
        </Link>
      </div>
    </>
  );
};

export default NotFound;
