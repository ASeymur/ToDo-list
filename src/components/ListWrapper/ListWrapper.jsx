import "./style.css";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

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
    localStorage.removeItem("tasks");
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
    const updatedTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTasks = (id, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
