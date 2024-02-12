import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bloglist = ({ blogs, title, handleEdit, handleDelete }) => {
  // const location = useNavigate();

  // const handleEdit = (id) => {
  //   location("blogsedit/" + id);
  // };
  return (
    <>
      <div className="blog-list">
        <h2>{title}</h2>
        {blogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {/* <h2>{blog.id}</h2> */}
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
            </Link>
            <div>
              <button className="btnHome gaap" onClick={() => handleEdit(blog)}>
                Edit
              </button>
              <button className="btnHome" onClick={() => handleDelete(blog.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}

        <ToastContainer />
      </div>
    </>
  );
};

export default Bloglist;
