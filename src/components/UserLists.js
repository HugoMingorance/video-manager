import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import ListCard from './ListCard';

const UserLists = ({ userId }) => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const userDocRef = doc(db, 'llistesPerUusuari', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const { llistesIds } = userDocSnap.data();
          if (llistesIds && llistesIds.length > 0) {
            const listsQuery = query(collection(db, 'lists'), where('__name__', 'in', llistesIds));
            const listsQuerySnapshot = await getDocs(listsQuery);
            const listsData = listsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLists(listsData);
          } else {
            setLists([]);
          }
        } else {
          console.log('No such document!');
          setLists([]);
        }
      } catch (error) {
        console.error('Error fetching lists: ', error);
        setError(error.message);
      }
    };

    if (userId) {
      fetchLists();
    }
  }, [userId]);

  return (
    <div className="user-lists">
      <h2>Mis Listas</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div className="lists-container">
        {lists.map(list => (
          <ListCard key={list.id} id={list.id} name={list.name} description={list.description} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default UserLists;