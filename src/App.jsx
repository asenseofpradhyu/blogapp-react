import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

//Local Imports
import Header from "./components/header";
import Footer from "./components/footer";
import Homepage from "./pages/homepage";
import Blog from "./pages/blog";
import Profile from "./pages/profile";
import NoPageFound from "./pages/no_page_found";
import "./App.css";

function App() {
  const [blogListData, setBlogListData] = useState([]);

  const onGetDataFromBlogComponent = (blogData) => {
    setBlogListData((prevDataArray) => [blogData, ...prevDataArray]);
    console.log(blogData);
  };

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage blogListData={blogListData} />} />
        <Route
          path="/blog"
          element={
            <Blog onPassDatatoAppComponent={onGetDataFromBlogComponent} />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
