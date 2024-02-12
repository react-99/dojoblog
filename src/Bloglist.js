import React from "react";
import { Link } from "react-router-dom";

const Bloglist = ({ blogs, title, handleEdit, handleDelete }) => {
  return (
    <>
      <div className="blog-list">
        <h2>{title}</h2>
        {blogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
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
      </div>
    </>
  );
};

export default Bloglist;
