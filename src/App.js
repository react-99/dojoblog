import BlogDetails from "./BlogDetails";
import Blogs from "./Blogs";
import Home from "./Home";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import BlogEdit from "./BlogEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar home="Home" blog="New Blog" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Blogs />} />
          <Route exact path="/blogs/:id" element={<BlogDetails />} />
          <Route exact path="/blogsedit/:id" element={<BlogEdit />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
