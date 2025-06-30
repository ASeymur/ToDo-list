import { useState } from "react";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import InputComponent from "../Common/InputComponent/InputComponent";
import "./style.css";
import PropTypes from "prop-types";
import ConfirmModal from "../Common/ModalComponent/ConfirmModal/ConfirmModal";
import AddEditTaskModal from "../Common/ModalComponent/AddEditTaskModal/AddEditTaskModal";
import ListItemDate from "../ListItemDate/ListItemDate";

const ListItem = ({
  tasks,
  onCheckboxChange,
  handleDeleteTask,
  handleEditTasks,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleCheckboxChange = () => {
    onCheckboxChange(tasks.id, !tasks.completed);
  };

  const handleConfirmDelete = () => {
    handleDeleteTask(tasks.id);
    setIsConfirmModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setDescription(tasks.description);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    handleEditTasks(tasks.id, description);
    handleCloseModal();
  };
  return (
    <div className="listItemWrapper">
      <ListItemDate
        createdAt={tasks.createdAt}
        completedAt={tasks.completedAt}
        isChecked={tasks.completed}
      />
      <div className="listItem">
        <div className="listItemDescription">
          <InputComponent
            type="checkbox"
            checked={tasks.completed}
            onChange={handleCheckboxChange}
            className="custom-checkbox"
          />
          <span
            style={
              tasks.completed
                ? { textDecoration: "line-through", color: "#0a7227" }
                : {}
            }
          >
            {tasks.description}
          </span>
        </div>
        <div className="listItemButtons">
          {!tasks.completed && (
            <ButtonComponent
              label="Edit"
              className="addTaskBtn"
              onClick={handleOpenModal}
            />
          )}
          <ButtonComponent
            label="Delete"
            className="addTaskBtn"
            onClick={handleOpenConfirmModal}
          />
        </div>
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseConfirmModal}
          title="Are you sure you want to delete this task?"
          confirmLabel="Delete"
        />
        <AddEditTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          description={description}
          setDescription={setDescription}
          onConfirm={handleEdit}
          handleKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEdit();
            }
          }}
          title="Edit Task"
          confirmLabel="Edit"
        />
      </div>
    </div>
  );
};

ListItem.propTypes = {
  tasks: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    completedAt: PropTypes.string,
  }).isRequired,

  onCheckboxChange: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleEditTasks: PropTypes.func.isRequired,
};

export default ListItem;
