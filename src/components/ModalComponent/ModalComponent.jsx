import "./style.css";

const ModalComponent = ( { isOpen, children  }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalWrapper">
      <div className="modal">
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;