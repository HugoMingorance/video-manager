import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import Header from '../components/Header';
import VideoCard from '../components/videoCard';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/ListDetails.module.css'; // Importa el CSS para la página de detalles

const Favorites = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteVideos = async () => {
      try {
        if (!user) {
          router.push('/profile'); // Redirigir a la página de inicio de sesión si no está autenticado
          return;
        }

        const userDocRef = doc(db, 'favorits', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const { videoIds } = userDocSnap.data();
          if (videoIds && videoIds.length > 0) {
            const videosQuerySnapshot = await Promise.all(
              videoIds.map(videoId => getDoc(doc(db, 'videos', videoId)))
            );
            const videosData = videosQuerySnapshot
              .filter(videoDoc => videoDoc.exists())
              .map(videoDoc => ({ id: videoDoc.id, ...videoDoc.data() }));
            setVideos(videosData);
          } else {
            setVideos([]);
          }
        } else {
          console.log('No such document!');
          setVideos([]);
        }
      } catch (error) {
        console.error('Error fetching favorite videos: ', error);
        setError(error.message);
      }
    };

    fetchFavoriteVideos();
  }, [user, router]);

  if (!user) {
    return null; // Renderiza null si no está autenticado para evitar parpadeos
  }

  return (
    <div>
      <Header userId={user.uid} />
      <div className={styles.listDetails}>
        <h2>Videos Favoritos</h2> {/* Título de sección */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <div className={styles.videosContainer}>
          {videos.map(video => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              createdAt={video.createdAt}
              videoUrl={video.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;