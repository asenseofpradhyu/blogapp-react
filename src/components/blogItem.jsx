import PropTypes from "prop-types";
function BlogItem({blogTitle, blogAuthor, blogTimeAndDate, blogAuthorImage}) {
    console.log("Blog Item: ",blogTitle);
  return (<div className="blog-item">
              <div className="blog-content">
                <div className="blog-text">
                  <h3 className="blog-title">
                    {blogTitle}
                  </h3>
                  <p className="blog-author">
                    {blogAuthor}
                  </p>
                  <p className="blog-publish-time">{blogTimeAndDate}</p>
                </div>
                <div className="blog-img">
                  <div className="blog-img-bg">
                    <img
                    //   src="https://api.dicebear.com/6.x/open-peeps/svg?face=angryWithFang,calm,blank"
                      src={blogAuthorImage}
                      style={{ height: 55 }}
                    />
                  </div>
                </div>
              </div>
  </div>);
}

BlogItem.propTypes = {
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.string.isRequired,
  blogTimeAndDate: PropTypes.string.isRequired,
  blogAuthorImage: PropTypes.string.isRequired,
};

export default BlogItem;
