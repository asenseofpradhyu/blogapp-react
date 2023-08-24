import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
function BlogItem({ blogTitle, blogAuthor, blogTimeAndDate, blogAuthorImage, onBlogClick, onBlogViewClick }) {
  console.log("Blog Item: ", blogTitle);

  return (
    <div className="blog-item" onClick={onBlogClick}>
      <div className="blog-content">
        <div className="blog-text">
          <h3 className="blog-title">{blogTitle}</h3>
          <p className="blog-author">{blogAuthor}</p>
          <p className="blog-publish-time">{blogTimeAndDate}</p>
        </div>
       <div className="blog-img-text">
         <div className="blog-img">
          <div className="blog-img-bg">
            <img
              //   src="https://api.dicebear.com/6.x/open-peeps/svg?face=angryWithFang,calm,blank"
              src={blogAuthorImage}
              style={{ height: 55 }}
            />
          </div>
        </div>
        <div className="blog-view">
          <p onClick={onBlogViewClick}>View</p>
        </div>
       </div>
      </div>
    </div>
  );
}

BlogItem.propTypes = {
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.any,
  blogTimeAndDate: PropTypes.string.isRequired,
  blogAuthorImage: PropTypes.string.isRequired,
  onBlogClick: propTypes.any,
  onBlogViewClick:propTypes.any
};

export default BlogItem;
