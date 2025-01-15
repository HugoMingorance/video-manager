import React from 'react';
import { useRouter } from 'next/router';

const ListCard = ({ id, name, description }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/list/${id}`);
  };

  return (
    <div className="list-card" onClick={handleClick}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ListCard;