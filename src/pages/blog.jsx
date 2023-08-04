import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";

//Local Imports
import CustomInputText from "../components/customInputText";
import CustomButton from "../components/customButton";
import CustomAlert from "../components/customAlert";
import formatDateTime from "../util/format_date";
import isEditorEmpty from "../util/editor_empty";
import "../css/button.css";

// Editor dropdown not working because of reactjsStrictmode

function Blog({ onPassDatatoAppComponent }) {
  // UseState Hooks
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentDate = new Date();

  const onSubmitBtnClick = (e) => {
    e.preventDefault();
    console.log("Clicked !!!");
    console.log("Blog Title:", blogTitle);
    console.log(
      "Blog Content:",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    console.log("Date: ", formatDateTime(currentDate));
    if (blogTitle && !isEditorEmpty(blogContent)) {
      onPassDatatoAppComponent({
        title: blogTitle,
        content: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
        date: formatDateTime(currentDate),
      });
      setFormSubmitted(false);
      setAlert(true);
      setBlogTitle("");
      setBlogContent(EditorState.createEmpty());
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      setFormSubmitted(true);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  return (
    <Container>
      <Row style={{ paddingTop: 90 }}>
        <Form className="mt-3">
          <CustomInputText
            inputLabel={"Blog Title"}
            inputPlaceholder={"Enter your Blog Title"}
            inputType={"text"}
            inputValidationMsg={"Please add Blog Title"}
            inputValue={blogTitle}
            inputOnChange={(e) => setBlogTitle(e.target.value)}
            inputIsValid={formSubmitted && blogTitle == ""}
          />

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
          {isEditorEmpty(blogContent) && blogTitle == "" && formSubmitted ? (
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
          <CustomButton
            buttonText={"Publish Blog"}
            buttonType={"submit"}
            buttonClassName={"btn btn-custom w-100"}
            buttonOnClick={(e) => onSubmitBtnClick(e)}
            // isDisabled={isEditorEmpty(blogContent) && blogTitle == ""}
          />
        </Form>
      </Row>
    </Container>
  );
}

Blog.propTypes = {
  onPassDatatoAppComponent: PropTypes.any,
};

export default Blog;
