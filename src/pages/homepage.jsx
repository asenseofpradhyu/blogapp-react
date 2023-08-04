import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import PropTypes from "prop-types";

// Local Imports
import BlogItem from "../components/blogItem";
import "../css/homepage.css";

function Homepage({ blogListData }) {
  console.log("Bloglist ", blogListData);
  return (
    <div className="main-content">
      <Container>
        <section id="search-section">
          <Row>
            <Col>
              <div className="searchfield">
                <Form.Control type="text" placeholder="Search Blog" />
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
              blogListData.map((blog, i) => (
                <BlogItem
                  key={i}
                  blogTitle={blog.title}
                  blogAuthor={"Pradhuman Padhiyar"}
                  blogTimeAndDate={blog.date}
                  blogAuthorImage={
                    "https://api.dicebear.com/6.x/open-peeps/svg?face=angryWithFang,calm,blank"
                  }
                />
              ))
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
