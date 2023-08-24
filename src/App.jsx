import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Local Imports
import Header from "./components/header";
import Footer from "./components/footer";
import Homepage from "./pages/homepage";
import Blog from "./pages/blog";
import Profile from "./pages/profile";
import NoPageFound from "./pages/no_page_found";
import "./App.css";
import ViewBlog from "./pages/view_blog";

function App() {
  const [blogListData, setBlogListData] = useState([]);
   const navigate = useNavigate();

  const onGetDataFromBlogComponent = (blogData) => {
    setBlogListData((prevDataArray) => [blogData, ...prevDataArray]);
    console.log(blogData);
  };

   const onGetUpdatedDataFromBlogComponent = (blogData) => {
    // setBlogListData([...blogListData.slice(0, blogData.blogID), blogData, ...blogListData.slice(blogData.blogID, blogListData.length)]);
     let newState = [...blogListData];
    newState[blogData.blogID] = blogData;
    setBlogListData(newState)
    console.log(blogData);
  };

  const onDeleteDataFromBlog = (blogId) => {
    setBlogListData((prevState) =>
      prevState.splice(blogId, 1)
    );
     navigate({pathname:'/'});
    console.log(blogId);
  };

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage blogListData={blogListData} />} />
        <Route
          path="/blog/*"
          element={
            <Blog onPassDatatoAppComponent={onGetDataFromBlogComponent} blogList={blogListData} onUpdateDatatoAppComponent={onGetUpdatedDataFromBlogComponent} onDeleteBlogFromBLogList={onDeleteDataFromBlog}/>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view/*" element={<ViewBlog blogList={blogListData}/>} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
