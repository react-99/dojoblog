import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const location = useNavigate();

  const { id } = useParams();
  const {
    isData: blog,
    isPending,
    isError,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      location("/");
    });
  };

  return (
    <>
      <section className="content">
        {isPending && <div>Loading...</div>}
        {isError && <div>{isError}</div>}
        {blog && (
          <article className="blog-details">
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <p>{blog.body}</p>
            <button onClick={handleDelete}>Delete</button>
          </article>
        )}
      </section>
    </>
  );
};

export default BlogDetails;
