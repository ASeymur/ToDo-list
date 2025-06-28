import PropTypes from "prop-types";
import Title from "../../../Title/Title";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import InputComponent from "../../InputComponent/InputComponent";
import ModalComponent from "../ModalComponent";

const AddEditTaskModal = ({
  isOpen,
  onClose,
  description,
  setDescription,
  onConfirm,
  handleKeyDown,
  title,
  confirmLabel,
}) => {
  return (
    <ModalComponent isOpen={isOpen}>
      <div className="closeModal">
        <ButtonComponent
          label="&#10006;"
          onClick={onClose}
          className="addTaskBtn padding"
        />
      </div>
      <Title className="addTitle">{title}</Title>
      <div className="modalInputsWrapper">
        <InputComponent
          type="text"
          placeholder="Type here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          handleKeyDown={handleKeyDown}
          className="listItem"
        />
      </div>
      <div className="modalButtonWrapper">
        <ButtonComponent
          label={confirmLabel}
          className="addTaskBtn addTaskBtnPadding"
          onClick={onConfirm}
        />
      </div>
    </ModalComponent>
  );
};

AddEditTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func,
  title: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
};

AddEditTaskModal.defaultProps = {
  handleKeyDown: () => {},
};

export default AddEditTaskModal;
