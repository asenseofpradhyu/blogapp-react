// Import necessary components and libraries
import { Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";

// Import local utility and component files
import CustomInputText from "../components/customInputText";
import CustomButton from "../components/customButton";
import CustomAlert from "../components/customAlert";
import formatDateTime from "../utils/format_date";
import isEditorEmpty from "../utils/editor_empty";
import "../css/button.css";
import "../css/blog.css";

// Create a functional component named "Blog"
function Blog({ onPassDatatoAppComponent }) {
  // UseState Hooks to manage various states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentDate = new Date();

  // Function triggered when the "Publish Blog" button is clicked
  const onSubmitBtnClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Logging blog title, content, and date to the console
    console.log("Blog Title:", blogTitle);
    console.log(
      "Blog Content:",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    console.log("Date: ", formatDateTime(currentDate));

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
          <CustomButton
            buttonText={"Publish Blog"}
            buttonType={"submit"}
            buttonClassName={"btn btn-custom w-100"}
            buttonOnClick={(e) => onSubmitBtnClick(e)}
          />
        </Form>
      </Row>
    </Container>
  );
}

// Prop type validation for the "onPassDatatoAppComponent" prop
Blog.propTypes = {
  onPassDatatoAppComponent: PropTypes.any,
};

// Export the "Blog" component as the default export
export default Blog;
