import React from 'react';

const ListCard = ({ name, description }) => {
  return (
    <div className="list-card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ListCard;