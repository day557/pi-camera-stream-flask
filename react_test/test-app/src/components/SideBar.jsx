import React from 'react';
import './styles/SideBar.css';
import home from './assets/home.svg';
import add_camera from './assets/add_camera.svg';
import notification from './assets/notification.svg';
import settings from './assets/settings.svg';

const Sidebar = ({ onContainerTypeSelect }) => {

    return (
        <div className='Sidebar'>
            <img
                src={home}
                alt=""
                title='Home'
                onClick={() => onContainerTypeSelect('CardContainer')} />
            <img src={add_camera} alt="" title='Add Camera' />
            <img src={notification} alt="" title='Notifications' />
            <img src={settings} alt="" title='Settings' onClick={() => onContainerTypeSelect('SettingsContainer')} />
        </div>
    );
};

export default Sidebar;