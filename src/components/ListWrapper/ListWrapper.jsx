import "./style.css";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import { useState } from "react";
import Stats from "../Stats/Stats";
import ListItem from "../ListItem/ListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditTaskModal from "../Common/ModalComponent/AddEditTaskModal/AddEditTaskModal";
import ConfirmModal from "../Common/ModalComponent/ConfirmModal/ConfirmModal";

const ListWrapper = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleAddTasks = (task) => {
    const newTask = {
      ...task,
      createdAt: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
    handleCloseModal();
  };
  const handleClearList = () => {
    setTasks([]);
    setIsConfirmModalOpen(false);
    toast.info("ToDo list has been cleared!", {
      autoClose: 2000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, completed: false, id: Date.now() };
    handleAddTasks(newItem);

    toast.success("You just created a new task!", {
      autoClose: 2000,
    });

    setDescription("");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setDescription("");
  };
  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((item) => item.id !== taskId));
  };

  const handleCheckboxChange = (taskId, isChecked) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: isChecked,
            completedAt: isChecked ? new Date().toLocaleString() : null,
          }
        : task
    );

    setTasks(updatedTasks);
  };

  const handleEditTasks = (id, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription } : task
    );

    setTasks(updatedTasks);
    handleCloseModal();
  };
  return (
    <div className="listWrapper">
      <div className="listWrapperHeader">
        <ButtonComponent
          label="Add ToDo task"
          onClick={handleOpenModal}
          className="addTaskBtn"
        />
        <Stats tasks={tasks} />
        {tasks.length > 0 && (
          <ButtonComponent
            label="Clear list ❌"
            onClick={handleOpenConfirmModal}
            className="clearTaskBtn"
          />
        )}
      </div>
      <div className="listItemsWrapper">
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            tasks={task}
            setTasks={setTasks}
            onCheckboxChange={handleCheckboxChange}
            handleDeleteTask={handleDeleteTask}
            handleEditTasks={handleEditTasks}
          />
        ))}
      </div>
      <AddEditTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        description={description}
        setDescription={setDescription}
        onConfirm={handleSubmit}
        handleKeyDown={handleKeyDown}
        title="Add Task"
        bv
        confirmLabel="Add"
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleClearList}
        onCancel={handleCloseModal}
        title="Are you sure you want to clear the list?"
        confirmLabel="Clear"
      />
      <ToastContainer />
    </div>
  );
};

export default ListWrapper;
