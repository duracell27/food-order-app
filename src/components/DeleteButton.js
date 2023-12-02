"use client";
import React, { useState } from "react";

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <div className="flex bg-black/80 items-center h-full justify-center absolute inset-0">
        <div className=" bg-white p-4 rounded-lg">
          <div className="">Are you shure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirmation(false)}>
              Cancel
            </button>
            <button onClick={()=>{onDelete();setShowConfirmation(false)}} type="button " className="primary whitespace-nowrap">
              Yes, delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button onClick={() => setShowConfirmation(true)} type="button">
      {label}
    </button>
  );
};

export default DeleteButton;
