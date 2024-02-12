import { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";
import "./style.css";
import ModalComponent from "../ModalComponent/ModalComponent";
import Title from "../Title/Title";

const ListItem = ({
  tasks,
  onCheckboxChange,
  handleDeleteTask,
  handleEditTasks,
}) => {
  const [isChecked, setIsChecked] = useState(tasks.completed || false);
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
    setIsChecked(!isChecked);
    onCheckboxChange(tasks.id, !isChecked);

    // If the task is checked, update the completion date
    if (!isChecked) {
      const updatedTasks = tasks.map((task) =>
        task.id === tasks.id
          ? {
              ...task,
              completed: true,
              completedAt: new Date().toLocaleString(),
            }
          : task
      );

      // Call the parent function to update tasks
      handleEditTasks(tasks.id, updatedTasks);
    }
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
      <div className="listItemDateWrapper">
        <div>
          <span className="listItemCreationLabel">Created:</span>
          <span className="listItemDate">{tasks.createdAt}</span>
        </div>
        <div>
          {isChecked && <span className="listItemDoneLabel">Done:</span>}
          {isChecked && tasks.completedAt && (
            <span className="listItemDate">{tasks.completedAt}</span>
          )}
        </div>
      </div>
      <div className="listItem">
        <div className="listItemDescription">
          <InputComponent
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="custom-checkbox"
          />
          <span
            style={
              isChecked
                ? { textDecoration: "line-through", color: "#0a7227" }
                : {}
            }
          >
            {tasks.description}
          </span>
        </div>
        <div className="listItemButtons">
          {!isChecked && (
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
        <ModalComponent isOpen={isConfirmModalOpen}>
          <div className="modalTitleWrapper">
            <h2 className="modalTitle">
              Are you sure you want to delete this ToDo task?
            </h2>
          </div>
          <div className="modalButtonsWrapper">
            <ButtonComponent
              label="Delete"
              onClick={handleConfirmDelete}
              className="addTaskBtn"
            />
            <ButtonComponent
              label="Cancel"
              onClick={handleCloseConfirmModal}
              className="addTaskBtn"
            />
          </div>
        </ModalComponent>
        <ModalComponent isOpen={isModalOpen}>
          <div className="closeModal">
            <ButtonComponent
              label="&#10006;"
              onClick={handleCloseModal}
              className="addTaskBtn padding"
            />
          </div>
          <Title className="editTitle">Edit ToDo</Title>
          <div className="modalInputsWrapper">
            <InputComponent
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              // handleKeyDown={handleKeyDown}
              className="listItem"
            />
          </div>
          <div className="modalButtonWrapper">
            <ButtonComponent
              label="Edit"
              className="addTaskBtn addTaskBtnPadding"
              onClick={handleEdit}
            />
          </div>
        </ModalComponent>
      </div>
    </div>
  );
};

export default ListItem;
