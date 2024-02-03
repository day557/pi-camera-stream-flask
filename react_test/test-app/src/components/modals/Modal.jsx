import React, { useState } from 'react';
import '../styles/Modal.css';

const CustomImageModal = ({ isOpen, onClose, onConfirm, imageUrl, onInputChange }) => {
  const [tempImageUrl, setTempImageUrl] = useState(imageUrl); // Use a temporary state

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    // Apply the temporary image URL on confirm
    onInputChange(tempImageUrl);
    onConfirm(tempImageUrl);
    onClose();
  };

  const handleBlackBoxClick = (e) => {
    // Close the modal when clicking on the black box
    if (e.target.classList.contains('blackbox')) {
      onClose();
    }
  };

  return (
    <div className='blackbox' onClick={handleBlackBoxClick}>
      <div className="custom-image-modal">
        <input
          type="text"
          placeholder="Enter Camera URL"
          onChange={(e) => setTempImageUrl(e.target.value)}
        />
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CustomImageModal;
