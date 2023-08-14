import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function CustomButton({
  buttonType,
  buttonText,
  buttonClassName,
  buttonOnClick,
  isDisabled,
}) {
  return (
    <Button
      className={buttonClassName}
      type={buttonType}
      onClick={buttonOnClick}
      disabled={isDisabled}
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
  isDisabled: PropTypes.bool,
};

CustomButton.defaultProps = {
  buttonType: "button",
  buttonClassName: "",
};

export default CustomButton;
