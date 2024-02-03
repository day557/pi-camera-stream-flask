import React from 'react';
import Card from './Card';

const CardContainer = ({ customImageUrls, openModal, setCustomImageUrls, setState, isPaneOpenLeft, selectedCard }) => {
  return (
    <div className='card-container'>
      {[1, 2, 3, 4, 5, 6].map((cardNumber) => (
        <Card
          key={cardNumber}
          cardNumber={cardNumber}
          imageUrl={customImageUrls[cardNumber - 1]}
          openModal={openModal}
          setState={setState}
        />
      ))}
    </div>
  );
};

export default CardContainer;