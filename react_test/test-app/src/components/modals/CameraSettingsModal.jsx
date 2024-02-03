import React from 'react';
import Modal from './Modal';

const CameraSettingsModal = ({ isOpen, onClose, onConfirm, cameraSettings, onSettingsChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onConfirm(cameraSettings)}
      title="Camera Settings"
    >
      <div>
        <label>Resolution:</label>
        <select
          value={cameraSettings.resolution}
          onChange={(e) => onSettingsChange({ ...cameraSettings, resolution: e.target.value })}
        >
          {['640x360', '480p', '720p', '1080p'].map((resolutionOption) => (
            <option key={resolutionOption} value={resolutionOption}>{resolutionOption}</option>
          ))}
        </select>
      </div>
      <div>
        <label>FPS:</label>
        <select
          value={cameraSettings.fps}
          onChange={(e) => onSettingsChange({ ...cameraSettings, fps: parseInt(e.target.value, 10) })}
        >
          {[15, 30, 45, 60].map((fpsOption) => (
            <option key={fpsOption} value={fpsOption}>{fpsOption} FPS</option>
          ))}
        </select>
      </div>
    </Modal>
  );
};

export default CameraSettingsModal;
