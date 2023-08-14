import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function CustomAlert({ isVisible, alertMessage, alertClass }) {
  return (
    <Alert variant={alertClass} show={isVisible}>
      {alertMessage}
    </Alert>
  );
}

CustomAlert.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  alertClass: PropTypes.string.isRequired,
};
export default CustomAlert;
