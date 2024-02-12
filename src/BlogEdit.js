import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogEdit = () => {
  const { id } = useParams();

  // console.log(id);

  // const location = useNavigate();

  const {
    isData: blogs,
    isPending,
    isError,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    author: "",
  });

  useEffect(() => {
    if (blogs) {
      setFormData({
        title: blogs.title || "",
        body: blogs.body || "",
        author: blogs.author || "",
      });
    }
  }, [blogs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      // console.log("blog added");
      toast.success("Blog Updated", {
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

  // Handle  changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="create">
        {isError && <div>{isError}</div>}
        {isPending && <div>Loading.....</div>}
        <form onSubmit={handleSubmit}>
          <label>Blog Title:</label>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label>Blog Body:</label>
          <textarea
            required
            name="body"
            value={formData.body}
            onChange={handleChange}
          ></textarea>
          <label>Blog Author:</label>
          <select name="author" value={formData.author} onChange={handleChange}>
            <option value="Mario">Mario</option>
            <option value="Jin">Jin</option>
            <option value="Trops">Trops</option>
            <option value="RR">RR</option>
          </select>
          <button className="btn">Update</button>
        </form>

        <ToastContainer />
      </section>
    </>
  );
};

export default BlogEdit;
