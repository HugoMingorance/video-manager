import React, { useState } from 'react';
import styles from '../styles/VideoCard.module.css'; // Importa el módulo CSS

const VideoCard = ({ title, description, createdAt, videoUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Extraer el ID del video de la URL
  const videoId = videoUrl.split('v=')[1]?.split('&')[0];

  return (
    <div className={styles.videoCard} onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p><small>Creado el: {new Date(createdAt).toLocaleDateString()}</small></p>
      {isExpanded && videoId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoCard;