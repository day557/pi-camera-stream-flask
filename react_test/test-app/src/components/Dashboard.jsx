import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "react-sliding-pane/dist/react-sliding-pane.css";
import './styles/Dashboard.css'
import Navbar from './NavBar';
import CardContainer from './CardContainer';
import Modal from './modals/Modal';
import SettingsPane from './SettingsPane';
import SideBar from './SideBar';
import SettingsContainer from './SettingsContainer';



import arrow_right from './assets/arrow_right.svg';

const Dashboard = () => {
  const navigate = useNavigate();

  // Modal for camera selection
  const [customImageUrls, setCustomImageUrls] = useState(Array(6).fill(''));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedCard, setSelectedCard] = useState(); // Declare setSelectedCard here

  const openModal = (cardNumber) => {
    setSelectedCard(cardNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmModal = (imageUrl) => {
    if (selectedCard !== null) {
      console.log('Selected Card:', selectedCard);
      setCustomImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[selectedCard - 1] = imageUrl; // Set the custom image URL for the selected card
        return newUrls;
      });
    }
    closeModal();
  };

  // Video Settings
  const [videoSettings, setVideoSettings] = useState({
    fps: 15,
    width: 640,
    height: 480,
  });

  // Function to handle the removal of the custom image URL
  const handleRemoveCustomImageUrl = () => {
    if (selectedCard !== null) {
      setCustomImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[selectedCard - 1] = ''; // Set the custom image URL for the selected card to an empty string
        return newUrls;
      });
    }
    setSelectedCard(null);
    closeModal();
    setState({ isPaneOpenLeft: false }); // Close the sliding pane
  };

  const handleLogout = () => {
    // No authentication logic for now, just navigate to the dashboard
    navigate('/');
  };

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
    selectedCamera: null, // Set to null or undefined initially
  });

  const [selectedContainerType, setSelectedContainerType] = useState('card');


  const handleContainerTypeSelection = (containerType) => {
    setSelectedContainerType(containerType);
  };

  return (
    <div className='dashboard-container'>
      <Navbar handleLogout={handleLogout} openSettingsPane={() => setState({ isPaneOpenLeft: true })} />
      <div className='lol'>
        <SideBar onContainerTypeSelect={handleContainerTypeSelection}/>
        {selectedContainerType === 'CardContainer' && (
          <CardContainer
            customImageUrls={customImageUrls}
            openModal={openModal}
            setCustomImageUrls={setCustomImageUrls}
            setState={setState}
            isPaneOpenLeft={state.isPaneOpenLeft}
            selectedCard={selectedCard}
          />
        )}
        {selectedContainerType === 'SettingsContainer' && (
          <SettingsContainer/>
        )}
        <div className='motion-menu'>
          <div className='motion-menu-head'>
            <h1>Detection</h1>
            <img src={arrow_right} alt="" />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={(imageUrl) => confirmModal(imageUrl)}
        imageUrl={customImageUrl}
        onInputChange={setCustomImageUrl}
      />
      <SettingsPane
        isOpen={state.isPaneOpenLeft}
        onClose={() => setState({ isPaneOpenLeft: false })}
        videoSettings={videoSettings}
        setVideoSettings={setVideoSettings}
        handleRemoveCustomImageUrl={handleRemoveCustomImageUrl}
      />
    </div>
  );
};

export default Dashboard;
