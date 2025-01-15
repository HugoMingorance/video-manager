import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import Header from '../../components/Header';
import VideoCard from '../../components/videoCard';
import styles from '../../styles/ListDetails.module.css'; // Importa el CSS para la página de detalles

const ListDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (!id) return;
        
        const videosQuery = query(collection(db, 'videos'), where('lists', 'array-contains', id));
        const videosQuerySnapshot = await getDocs(videosQuery);
        const videosData = videosQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching videos: ', error);
        setError(error.message);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <div>
      <Header />
      <div className={styles.listDetails}>
        <h2>Videos de la Lista</h2> {/* Título de sección */}
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

export default ListDetails;