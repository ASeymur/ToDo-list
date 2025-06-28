import PropTypes from "prop-types";
import ModalComponent from "../ModalComponent";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  confirmLabel = "Confirm",
}) => {
  return (
    <ModalComponent isOpen={isOpen}>
      <div className="modalTitleWrapper">
        <h2 className="modalTitle">{title}</h2>
      </div>
      <div className="modalButtonsWrapper">
        <ButtonComponent
          label={confirmLabel}
          onClick={onConfirm}
          className="addTaskBtn"
        />
        <ButtonComponent
          label="Cancel"
          onClick={onCancel}
          className="addTaskBtn"
        />
      </div>
    </ModalComponent>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
};

export default ConfirmModal;
