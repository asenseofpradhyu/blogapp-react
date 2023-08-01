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
import "../css/button.css";

// Editor dropdown not working because of reactjsStrictmode

function Blog({ onPassDatatoAppComponent }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const currentDate = new Date();

  const formatDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${day}/${month}/${year} - ${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  const onSubmitBtnClick = (e) => {
    e.preventDefault();
    console.log("Clicked !!!");
    console.log("Blog Title:", blogTitle);
    console.log(
      "Blog Content:",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    onPassDatatoAppComponent({
      title: blogTitle,
      content: draftToHtml(convertToRaw(blogContent.getCurrentContent())),
      date: formatDateTime(currentDate),
    });
    setFormSubmitted(false);
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
            <Form.Control.Feedback type="invalid">
              Please add blog content.
            </Form.Control.Feedback>
          </Form.Group>
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

Blog.propTypes = {
  onPassDatatoAppComponent: PropTypes.any,
};

export default Blog;
