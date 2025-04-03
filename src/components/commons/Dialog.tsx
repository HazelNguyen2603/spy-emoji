import React from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Dialog = ({ isOpen, onClose, title, children }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-secondary opacity-80"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
        <div className="bg-secondary-light rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center p-4 ">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 cursor-pointer font-semibold text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
