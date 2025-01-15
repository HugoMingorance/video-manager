import { useEffect, useState } from 'react';
import { auth, db } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

const TestFirebase = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Prueba de autenticación
    signInWithEmailAndPassword(auth, 'HugoHugo@gmail.com', 'Hugo0808')
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });

    // Prueba de Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'your_collection_name'));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setData(docs);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Prueba de Firebase</h1>
      {user ? <p>Usuario autenticado: {user.email}</p> : <p>No autenticado</p>}
      <h2>Datos de Firestore:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestFirebase;