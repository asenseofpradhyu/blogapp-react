import {  Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';


function ViewBlog({blogList}) {

  const [blogTitle, setBlogTitle] = useState("");
  const [convertedBlogContent, setConvertedBlogContent] = useState(null);


  //Route hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log(blogList)



   //UseEffect
  useEffect(() => {

  const blogId = searchParams.get("blogID");

if(blogList.length == 0){
  navigate({pathname:'/'});
}
console.log(blogList)
  if(blogId && blogList.length != 0){


   setBlogTitle(blogList[blogId].title);
setConvertedBlogContent(blogList[blogId].content);
  }

   }, [blogList]); 

   function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }


  return  <div className="main-content">
      <Container>

        <section id="bloglist-title-section">
          <div className="bloglist-title">
            <h2>{blogTitle}</h2>
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
          </div>
        </section>
        <section id="bloglist-section">
         <div       className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedBlogContent)}>
         </div>
        </section>
      </Container>
    </div>;
}

ViewBlog.propTypes = {
  blogList: PropTypes.any,
};

export default ViewBlog;
