import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import styles from '../styles/VideoCard.module.css'; // Importa el módulo CSS

const VideoCard = ({ videoIdFb, title, description, createdAt, videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false); // Estado para controlar la visibilidad del video
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar si el video es favorito
  const { user } = useAuth(); // Obtener el usuario autenticado

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

  // Verificar si el video es favorito cuando el componente se monta
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user && videoIdFb) {
        const userDocRef = doc(db, 'favorits', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const { videoIds } = userDocSnap.data();
          setIsFavorite(videoIds.includes(videoIdFb));
        }
      }
    };

    checkIfFavorite();
  }, [user, videoIdFb]);

  // Manejador de clic para mostrar/ocultar el video
  const handleClick = () => {
    setShowVideo(!showVideo);
  };

  // Manejador de clic para el botón de "corazón"
  const handleFavoriteClick = async () => {
    if (!user) {
      alert('Por favor, inicia sesión para marcar videos como favoritos.');
      return;
    }

    if (!videoIdFb) {
      console.error('Video ID from Firebase is null.');
      return;
    }

    try {
      const userDocRef = doc(db, 'favorits', user.uid);
      if (isFavorite) {
        await updateDoc(userDocRef, {
          videoIds: arrayRemove(videoIdFb)
        });
      } else {
        await updateDoc(userDocRef, {
          videoIds: arrayUnion(videoIdFb)
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite videos: ', error);
    }
  };

  return (
    <div className={styles.videoCard} onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      {showVideo && videoId && (
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
      <div className={styles.footer}>
        <p><small>Creado el: {new Date(createdAt).toLocaleDateString()}</small></p>
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el clic en el botón de "corazón" muestre/oculte el video
            handleFavoriteClick();
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;