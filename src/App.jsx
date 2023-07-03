import React from "react";
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
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
