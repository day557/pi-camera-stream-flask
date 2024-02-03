import React from 'react';

import plus_icon from './assets/plus.svg'

const Card = ({ cardNumber, imageUrl, openModal, setState }) => {
  return (
    <div className='card' key={cardNumber}>
      {imageUrl ? (
        <img src={imageUrl} alt='Error' onClick={() => setState({ isPaneOpenLeft: true })} />
      ) : (
        <div className='plus_icon' onClick={() => openModal(cardNumber)}>
          <img src={plus_icon} alt={`Select Camera ${cardNumber}`} />
        </div>
      )}
    </div>
  );
};

export default Card;