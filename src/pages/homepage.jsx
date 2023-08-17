import { Stack, Container, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


// Local Imports
import BlogItem from "../components/blogItem";
import "../css/homepage.css";
import { useState } from "react";
import { getNameLocalStore } from "../utils/local_storage";


function Homepage({ blogListData }) {

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  console.log(blogListData);

  const onBlogItemClick = (blogId) => {
    navigate({pathname:'/blog', search:`?blogID=${blogId}`});
    console.log("Blog Click");
  }


  return (
    <div className="main-content">
      <Container>
        <section id="search-section">
          <Row>
            <Col>
              <div className="searchfield">
                <Form.Control type="text" placeholder="Search Blog" onChange={(e) => setSearch(e.target.value)}/>
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
            </Col>
          </Row>
        </section>
        <section id="bloglist-title-section">
          <div className="bloglist-title">
            <h2>All Blogs</h2>
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
          </div>
        </section>
        <section id="bloglist-section">
          <Stack gap={3}>
            {blogListData.length === 0 ? (
              <p style={{ textAlign: "center" }}>No Blogs are available 😔</p>
            ) : (
 
              blogListData.filter((blogItem) => blogItem.title.toLowerCase().includes(search.toLowerCase())).map((filteredBlogItem, index) => {return <BlogItem
                  key={index}
                  blogTitle={filteredBlogItem.title}
                  blogAuthor={getNameLocalStore() ? getNameLocalStore() : "Anonymous"}
                  blogTimeAndDate={filteredBlogItem.date}
                  blogAuthorImage={
                    "https://api.dicebear.com/6.x/open-peeps/svg?face=angryWithFang,calm,blank"
                  }
                  onBlogClick={() => onBlogItemClick(index)}
                />})
            )}
          </Stack>
        </section>
      </Container>
    </div>
  );
}

Homepage.propTypes = {
  blogListData: PropTypes.any,
};

export default Homepage;
