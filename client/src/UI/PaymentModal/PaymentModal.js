import React from "react";
import "./PaymentModal.css";
import { CustomRadio, ModalComponent } from "../../components";

export const PaymentModal = ({ setVisibleModal, price }) => {
  const handleClick = () => setVisibleModal(false);
  return (
    <ModalComponent setVisibleModal={setVisibleModal}>
      <div className="modal-title">Платежный метод</div>
      <div className="payment-methods-container">
        <div className="payment-method-item">
          <CustomRadio label={"VISA *1234"} />
        </div>
        <div className="btn-buy" onClick={handleClick}>
          Купить за {price} UZS
        </div>
      </div>
    </ModalComponent>
  );
};
