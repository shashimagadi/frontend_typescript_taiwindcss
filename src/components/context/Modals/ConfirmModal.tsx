import React, { createContext, useState, useContext, ReactNode } from "react";
import { Modal, Button } from "antd";

// ✅ Define types
interface ConfirmModalContextType {
  showModal: (message: string, onConfirm: () => void) => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextType | undefined>(
  undefined
);

// ✅ Context Provider
export const ConfirmModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  // Function to show the modal
  const showModal = (msg: string, confirmAction: () => void) => {
    setMessage(msg);
    setOnConfirm(() => confirmAction);
    setIsOpen(true);
  };
  

  return (
    <ConfirmModalContext.Provider value={{ showModal }}>
      {children}

      {/* ✅ Global Confirmation Modal */}
      <Modal
        title="Confirmation"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsOpen(false)}>
            No
          </Button>,
          <Button key="confirm" type="primary" danger onClick={() => {
            onConfirm();
            setIsOpen(false);
          }}>
            Yes
          </Button>,
        ]}
      >
        <p>{message}</p>
      </Modal>
    </ConfirmModalContext.Provider>
  );
};

// ✅ Custom hook for using modal
export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error("useConfirmModal must be used within ConfirmModalProvider");
  }
  return context;
};
