// Import necessary components and libraries
import { Row, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";
import { useSearchParams, useNavigate } from "react-router-dom";

// Import local utility and component files
import CustomInputText from "../components/customInputText";
import CustomButton from "../components/customButton";
import CustomAlert from "../components/customAlert";
import formatDateTime from "../utils/format_date";
import isEditorEmpty from "../utils/editor_empty";
import "../css/button.css";
import "../css/blog.css";

// Create a functional component named "Blog"
function Blog({ onPassDatatoAppComponent, blogList, onUpdateDatatoAppComponent, onDeleteBlogFromBLogList }) {
  // UseState Hooks to manage various states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentDate = new Date();

  // console.log("Blog Component ",blogList);

  //Route hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();



  //UseEffect
  useEffect(() => {

  const blogId = searchParams.get("blogID");

if(blogList.length == 0){
  navigate({pathname:'/blog'});
}

  if(blogId && blogList.length != 0){


   setBlogTitle(blogList[blogId].title);
   setBlogContent(() => {
    const blocksFromHTML = convertFromHTML(blogList[blogId].content)
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )

    return EditorState.createWithContent(contentState)
  });
  //  console.log(editorState);
  }

   }, [blogList]); 






  // Function triggered when the "Publish Blog" button is clicked
  const onSubmitBtnClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Handling form submission
    if (blogTitle && !isEditorEmpty(blogContent)) {
      // If both title and content are provided
      // Call the prop function to pass data
      onPassDatatoAppComponent({
        title: blogTitle,
        content: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
        date: formatDateTime(currentDate),
      });
      // Reset form submission status
      setFormSubmitted(false);
      // Show success alert
      setAlert(true);
      // Clear title and content fields
      setBlogTitle("");
      setBlogContent(EditorState.createEmpty());
      // Hide the alert after a delay
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      // If title or content is missing
      // Set form submission status and show a warning alert
      setFormSubmitted(true);
      setAlert(true);
      // Hide the alert after a delay
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  // Function triggered when the "Delete Blog" button is clicked
  const onClickDelete = (e) => {
    e.preventDefault();
    
    onDeleteBlogFromBLogList({
        blogID:searchParams.get("blogID")
      });

  };

    // Function triggered when the "Update Blog" button is clicked
  const onClickUpdate = (e) => {
     e.preventDefault(); // Prevent the default form submission behavior

    // Handling form submission
    if (blogTitle && !isEditorEmpty(blogContent)) {
      // If both title and content are provided
      // Call the prop function to pass data
      onUpdateDatatoAppComponent({
        title: blogTitle,
        content: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
        date: formatDateTime(currentDate), 
        blogID:searchParams.get("blogID")
      });
      // Reset form submission status
      setFormSubmitted(false);
      // Show success alert
      setAlert(true);
      // Clear title and content fields
      setBlogTitle("");
      setBlogContent(EditorState.createEmpty());
      // Hide the alert after a delay
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      // If title or content is missing
      // Set form submission status and show a warning alert
      setFormSubmitted(true);
      setAlert(true);
      // Hide the alert after a delay
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }

  };

  // Return JSX for rendering
  return (
    <Container>
      <Row style={{ paddingTop: 90 }}>
        <Form className="mt-3">
          {/* Render the custom input text component */}
          <CustomInputText
            inputLabel={"Blog Title"}
            inputPlaceholder={"Enter your Blog Title"}
            inputType={"text"}
            inputValidationMsg={"Please add Blog Title"}
            inputValue={blogTitle}
            inputOnChange={(e) => setBlogTitle(e.target.value)}
            inputIsValid={formSubmitted && blogTitle === ""}
          />

          {/* Render the editor component */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Write your blog</Form.Label>
            <Editor
              defaultEditorState={blogContent}
              editorState={blogContent}
              onEditorStateChange={setBlogContent}
            />
            <Form.Control.Feedback
              style={{
                display:
                  formSubmitted && isEditorEmpty(blogContent)
                    ? "block"
                    : "none",
              }}
              type="invalid"
            >
              Please add blog content.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Render the alert component based on conditions */}
          {isEditorEmpty(blogContent) && blogTitle === "" && formSubmitted ? (
            <CustomAlert
              isVisible={alert}
              alertMessage="Please fill all required forms ❌"
              alertClass="danger"
            />
          ) : (
            <CustomAlert
              isVisible={alert}
              alertMessage="Your blog publish successfully 🎉"
              alertClass="success"
            />
          )}

          {/* Render the custom button component */}
{searchParams.get("blogID") && blogList.length != 0 ? 
          <>
           <CustomButton
            buttonText={"Update Blog"}
            buttonType={"submit"}
            buttonClassName={"btn btn-custom w-100"}
            buttonOnClick={(e) => onClickUpdate(e)}
          />
           <CustomButton
            buttonText={"Delete Blog"}
            buttonType={"submit"}
            buttonClassName={"btn btn-warning w-100 mt-3"}
            buttonOnClick={(e) => onClickDelete(e)}
          />
          </>
          : <CustomButton
            buttonText={"Publish Blog"}
            buttonType={"submit"}
            buttonClassName={"btn btn-custom w-100"}
            buttonOnClick={(e) => onSubmitBtnClick(e)}
          />
}
        </Form>
      </Row>
    </Container>
  );
}

// Prop type validation for the "onPassDatatoAppComponent" prop
Blog.propTypes = {
  onPassDatatoAppComponent: PropTypes.any,
  blogList: PropTypes.any,
  onUpdateDatatoAppComponent:PropTypes.any,
  onDeleteBlogFromBLogList: PropTypes.any
};

// Export the "Blog" component as the default export
export default Blog;
