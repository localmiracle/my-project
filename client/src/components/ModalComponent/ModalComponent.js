import React from "react";
import "./ModalComponent.css";

export const ModalComponent = ({ setVisibleModal, children }) => {
  const handleCloseModal = () => setVisibleModal(false);
  return (
    <div className="overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
