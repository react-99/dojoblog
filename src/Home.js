import useFetch from "./useFetch";
import React, { useState, useEffect } from "react";
import Bloglist from "./Bloglist";

const Home = () => {
  const {
    isData: blogs,
    isPending,
    isError,
  } = useFetch("http://localhost:8000/blogs/");
  const [blogsState, setBlogsState] = useState(blogs);

  const [actionType, setActionType] = useState("add");
  // Add a new blog post to the list.

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

  useEffect(() => {
    setBlogsState(blogs);
  }, [blogs]);
  const handleFormSubmitation = (e) => {
    e.preventDefault();
    if (actionType === "add") {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBlogsState((prevBlogsState) => [...prevBlogsState, data]);
        });
    } else if (actionType === "edit") {
      fetch(`http://localhost:8000/blogs/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBlogsState((prevBlogsState) =>
            prevBlogsState.map((blog) => (blog.id === data.id ? data : blog))
          );
        });
    }
    setFormData({
      title: "",
      body: "",
      author: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEdit = (blog) => {
    setFormData(blog);
    setActionType("edit");
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogsState((prevBlogsState) =>
          prevBlogsState.filter((blog) => blog.id !== data.id)
        );
      });
  };

  return (
    <>
      <section className="content fixDisplay">
        {isError && <div>{isError}</div>}
        {isPending && <div>Loading.....</div>}
        <div style={{ width: "600px" }}>
          {blogsState && (
            <Bloglist
              blogs={blogsState}
              title="All Blog!"
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
        {/* blog add section */}
        <div>
          <section className="create">
            <form onSubmit={handleFormSubmitation}>
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
              <select
                value={formData.author}
                name="author"
                onChange={handleChange}
              >
                <option value="Mario">Mario</option>
                <option value="Jin">Jin</option>
                <option value="Trops">Trops</option>
                <option value="RR">RR</option>
              </select>
              <button className="btn">
                {actionType === "add" ? "Add Blog" : "Edit Blog"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default Home;
