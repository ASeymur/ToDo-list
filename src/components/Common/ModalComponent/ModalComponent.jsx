import "./style.css";
import PropTypes from "prop-types";

const ModalComponent = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalWrapper">
      <div className="modal">{children}</div>
    </div>
  );
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default ModalComponent;
