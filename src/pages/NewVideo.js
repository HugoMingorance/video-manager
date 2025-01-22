import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import nVStyles from '../styles/NewVideo.module.css';
import styles from '../styles/Header.module.css'; 
import Header from '../components/Header';

const NewVideo = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [allLists, setAllLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [isCreatingNewList, setIsCreatingNewList] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUserLists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lists'));
        const lists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllLists(lists);
      } catch (error) {
        console.error('Error fetching user lists: ', error);
      }
    };

    loadUserLists();
  }, []);

  const handleAddVideo = async () => {
    if (!title || !type || !url || (!selectedList && !isCreatingNewList)) {
      alert('Por favor, completa todos los campos y selecciona o crea una lista.');
      return;
    }

    let listId = selectedList;

    if (isCreatingNewList) {
      if (!newListName) {
        alert('Por favor, ingresa un nombre para la nueva lista.');
        return;
      }

      try {
        const docRef = await addDoc(collection(db, 'lists'), {
          name: newListName,
          description: newListDescription,
        });
        listId = docRef.id;
      } catch (error) {
        console.error('Error creating new list: ', error);
        alert('Hubo un problema al crear la nueva lista.');
        return;
      }
    }

    const videoData = {
      title,
      type,
      url,
      description,
      lists: [listId],
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      await addDoc(collection(db, 'videos'), videoData);
      alert('Video agregado correctamente.');
      // Limpiar los campos
      setTitle('');
      setType('');
      setUrl('');
      setDescription('');
      setSelectedList('');
      setNewListName('');
      setNewListDescription('');
      setIsCreatingNewList(false);
      // Redirigir a la página principal o a la lista de videos
      router.push('/');
    } catch (error) {
      console.error('Error adding video: ', error);
      alert('Hubo un problema al agregar el video.');
    }
  };

  return (
    <>
      <Header />
      <div className={nVStyles.container}>
        <h1>Agregar Nuevo Video</h1>
        <div className={nVStyles.form}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={nVStyles.input}
          />
          <input
            type="text"
            placeholder="Tipo (YouTube/Instagram)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={nVStyles.input}
          />
          <input
            type="text"
            placeholder="URL del Video"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={nVStyles.input}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={nVStyles.input}
          />
          <select
            value={selectedList}
            onChange={(e) => {
              setSelectedList(e.target.value);
              setIsCreatingNewList(e.target.value === 'new');
            }}
            className={styles.select}
          >
            <option value="">Selecciona una lista</option>
            <option value="new">Crear nueva lista</option>
            {allLists.map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
          {isCreatingNewList && (
            <div>
              <input
                type="text"
                placeholder="Nombre de la nueva lista"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Descripción de la nueva lista"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                className={styles.input}
              />
            </div>
          )}
          <button onClick={handleAddVideo} className={styles.button}>Agregar Video</button>
        </div>
      </div>
    </>
  );
};

export default NewVideo;