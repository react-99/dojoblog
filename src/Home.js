import useFetch from "./useFetch";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Bloglist from "./Bloglist";

const Home = () => {
  const {
    isData: blogs,
    isPending,
    isError,
  } = useFetch("http://localhost:8000/blogs/");
  const [blogsState, setBlogsState] = useState(blogs);

  // Blog Add section
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  // const [author, setAuthor] = useState("Mario");
  // const [isThisPending, setIsThisPending] = useState(false);

  const [actionType, setActionType] = useState("add");

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

  // const location = useNavigate();
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
          // console.log("blog added");
          // // setIsThisPending(false);
          // toast.success("Blog Added", {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
          // location("/");
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
          // console.log("blog Updated");
          // toast.success("Blog Updated", {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
          // location("/");
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
        // console.log("blog deleted");
        // toast.error("Blog Deleted", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        // location("/");
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
                // onChange={(e) => setTitle(e.target.value)}
              />
              <label>Blog Body:</label>
              <textarea
                required
                name="body"
                value={formData.body}
                onChange={handleChange}
                // onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <label>Blog Author:</label>
              <select
                value={formData.author}
                name="author"
                onChange={handleChange}
                // onChange={(e) => setAuthor(e.target.value)}
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
            {/* <ToastContainer /> */}
          </section>
        </div>
      </section>
    </>
  );
};

export default Home;
