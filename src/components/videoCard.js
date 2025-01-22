import React from 'react';
import styles from '../styles/VideoCard.module.css'; // Importa el módulo CSS

const VideoCard = ({ title, description, createdAt, videoUrl }) => {
  // Extraer el ID del video de la URL
  const extractVideoId = (url) => {
    try {
      console.log("Video URL:", url); // Debug: Mostrar la URL del video
      const urlObj = new URL(url);
      console.log("URL Object:", urlObj); // Debug: Mostrar el objeto URL
      
      let videoId = null;
      if (urlObj.host === 'youtu.be') {
        // URL corta de YouTube
        videoId = urlObj.pathname.slice(1); // Obtener el ID del video del pathname
      } else {
        // URL normal de YouTube
        const urlParams = new URLSearchParams(urlObj.search);
        videoId = urlParams.get('v');
      }
      
      console.log("Video ID:", videoId); // Debug: Mostrar el ID del video
      return videoId;
    } catch (error) {
      console.error("Error al extraer el ID del video:", error);
      return null;
    }
  };

  const videoId = extractVideoId(videoUrl);

  return (
    <div className={styles.videoCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      {videoId ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Error al cargar el video</p>
      )}
      <p><small>Creado el: {new Date(createdAt).toLocaleDateString()}</small></p>
    </div>
  );
};

export default VideoCard;