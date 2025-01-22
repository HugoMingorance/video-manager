import React from 'react';
import { useRouter } from 'next/router';

const ListCard = ({ id, name, description, userId }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    router.push(`/list/${id}?userId=${userId}`);
  };

  return (
    <div className="list-card" onClick={handleClick}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ListCard;