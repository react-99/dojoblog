import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Mario");
  const [isPending, setIsPending] = useState(false);
  // const location = useNavigate();
  const handleFormSubmitation = (e) => {
    // console.log(e);
    e.preventDefault();
    const blog = { title, body, author };
    // console.log(blog);
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("blog added");
      setIsPending(false);
      toast.success("Blog Added", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // location("/");
    });
  };
  return (
    <>
      <section className="create">
        <form onSubmit={handleFormSubmitation}>
          <label>Blog Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog Body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Blog Author:</label>
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="Mario">Mario</option>
            <option value="Jin">Jin</option>
            <option value="Trops">Trops</option>
            <option value="RR">RR</option>
          </select>
          {!isPending && <button className="btn">Add Blog</button>}
          {isPending && (
            <button className="btn" disabled>
              Adding Blog....
            </button>
          )}
        </form>
        <ToastContainer />
      </section>
    </>
  );
};

export default Blogs;
