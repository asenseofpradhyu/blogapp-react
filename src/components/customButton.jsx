/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function CustomButton({
  buttonType,
  buttonText,
  buttonClassName,
  buttonOnClick,
}) {
  return (
    <Button
      className={buttonClassName}
      type={buttonType}
      onClick={buttonOnClick}
    >
      {buttonText}
    </Button>
  );
}

CustomButton.propTypes = {
  buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
  buttonText: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string,
  buttonOnClick: PropTypes.func.isRequired,
};

CustomButton.defaultProps = {
  buttonType: "button",
  buttonClassName: "",
};

export default CustomButton;
