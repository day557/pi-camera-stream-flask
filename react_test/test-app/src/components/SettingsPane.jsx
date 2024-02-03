import React from 'react';
import SlidingPane from 'react-sliding-pane';
import './styles/SettingsPane.css';

const SettingsPane = ({ isOpen, onClose, videoSettings, setVideoSettings, handleRemoveCustomImageUrl }) => {
  return (
    <SlidingPane
      className='sliding-pane'
      isOpen={isOpen}
      title='Settings'
      closeIcon={<div><img src="" alt="" /></div>}
      from='left'
      width='480px'
      onRequestClose={onClose}
      hideHeader={true}
    >
      <div className='settings_container'>
        <label>
          Enable object detection:
          <input
            type="checkbox"
            checked={videoSettings.enableObjectDetection}
            onChange={(e) => setVideoSettings({ ...videoSettings, enableObjectDetection: e.target.checked })}
          />
        </label>
      <div><label>
          Record on detection:
          <input
            type="checkbox"
            checked={videoSettings.enableObjectDetection}
            onChange={(e) => setVideoSettings({ ...videoSettings, enableObjectDetection: e.target.checked })}
          />
        </label></div>
      <div><label>
          Notify on detection:
          <input
            type="checkbox"
            checked={videoSettings.enableObjectDetection}
            onChange={(e) => setVideoSettings({ ...videoSettings, enableObjectDetection: e.target.checked })}
          />
        </label></div>
      <div>
        <label>Resolution:</label>
        <select
          value={videoSettings.resolution}
          onChange={(e) => setVideoSettings({ ...videoSettings, resolution: e.target.value })}
          >
          {['640x360', '480p', '720p', '1080p'].map((resolutionOption) => (
            <option key={resolutionOption} value={resolutionOption}>{resolutionOption}</option>
            ))}
        </select>
      </div>
      <div>
        <label>Framerate:</label>
        <select
          value={videoSettings.fps}
          onChange={(e) => setVideoSettings({ ...videoSettings, fps: parseInt(e.target.value, 10) })}
          >
          {[15, 30, 45, 60].map((fpsOption) => (
            <option key={fpsOption} value={fpsOption}>{fpsOption}</option>
            ))}
        </select>
      </div>
            </div>
      <div className='del_apl_container'>
        <button className='remove_button'>Apply Settings</button>
        <button className='remove_button' onClick={handleRemoveCustomImageUrl}>Remove Camera</button>
      </div>
    </SlidingPane>
  );
};

export default SettingsPane;