/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

function CustomInputText({
  inputLabel,
  inputType,
  inputPlaceholder,
  inputValidationMsg,
  inputOnChange,
  inputValue,
  inputIsValid,
}) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>{inputLabel}</Form.Label>
      <Form.Control
        type={inputType}
        placeholder={inputPlaceholder}
        onChange={inputOnChange}
        value={inputValue}
        isInvalid={inputIsValid}
      />
      <Form.Control.Feedback className="" type="invalid">
        {inputValidationMsg}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

CustomInputText.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(["text", "number", "email"]),
  inputPlaceholder: PropTypes.string.isRequired,
  inputValidationMsg: PropTypes.string.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  inputIsValid: PropTypes.bool.isRequired,
};

export default CustomInputText;